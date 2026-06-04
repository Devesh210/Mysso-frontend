import { useState, useEffect, useRef } from "react";

export default function MegaMenu({ menuData, name, pageSize = 10, fetchMoreData }) {
    const [page, setPage] = useState(1);
    const [menuItems, setMenuItems] = useState(menuData?.data || []); // Initially show data
    const [loading, setLoading] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]); // Track selected items
    const menuRef = useRef(null);

    useEffect(() => {
        if (page === 1) {
            // Set initial menu items
            setMenuItems(menuData?.data || []);
        } else {
            // Append new items when a new page is fetched
            setMenuItems((prevItems) => [...prevItems, ...menuData?.data]);
        }
    }, [menuData]);

    // Handle scroll event to load more items
    const handleScroll = () => {
        const { scrollTop, scrollHeight, clientHeight } = menuRef.current;
        if (scrollTop + clientHeight >= scrollHeight && !loading && menuData?.hasMore) {
            loadMoreItems();
        }
    };

    // Function to load more items from API
    const loadMoreItems = async () => {
        setLoading(true);
        await fetchMoreData(page + 1); // Fetch next page using the parent component's function
        setPage((prevPage) => prevPage + 1);
        setLoading(false);
    };

    useEffect(() => {
        const menuElement = menuRef.current;
        if (menuElement) {
            menuElement.addEventListener("scroll", handleScroll);
        }

        return () => {
            if (menuElement) {
                menuElement.removeEventListener("scroll", handleScroll);
            }
        };
    }, [menuData, loading]);

    // Function to handle item selection
    const toggleItemSelection = (item) => {
        if (selectedItems.includes(item)) {
            // If the item is already selected, remove it from selected list
            setSelectedItems((prev) => prev.filter((selected) => selected !== item));
            setMenuItems((prevItems) => [item, ...prevItems]); // Add back to menu
        } else {
            // If not selected, add it to selected list
            setSelectedItems((prev) => [...prev, item]);
            setMenuItems((prevItems) => prevItems.filter((menuItem) => menuItem !== item)); // Remove from menu
        }
    };

    const renderSubMenu = (options, parentIndex) => {
        return (
            <ul className="multi-level-dropdown">
                {options?.map((subItem, subIndex) => {
                    const currentIndex = `${parentIndex}-${subIndex}`;
                    return (
                        <li key={currentIndex}>
                            <div className="dropdown-option" onClick={() => toggleItemSelection(subItem)}>
                                {subItem[name]}
                            </div>
                            {subItem?.options && (
                                <div className="nested-dropdown">
                                    {renderSubMenu(subItem?.options, currentIndex)}
                                </div>
                            )}
                        </li>
                    );
                })}
            </ul>
        );
    };

    return (
        <div className="select-wrapper">
            <div className="select-input">
                <span className="dropdown-arrow">&#9662;</span>
            </div>

            <div className="dropdown-container" ref={menuRef} style={{ maxHeight: "300px", overflowY: "auto" }}>
                <ul className="multi-level-dropdown">
                    {menuItems?.map((item, index) => (
                        <li key={index}>
                            <div className="dropdown-option" onClick={() => toggleItemSelection(item)}>
                                {item[name]}
                            </div>
                            {item?.options && (
                                <div className="nested-dropdown">
                                    {renderSubMenu(item?.options, index)}
                                </div>
                            )}
                        </li>
                    ))}
                </ul>

                {loading && <div className="loading">Loading...</div>}
            </div>

            {/* Selected Items Display */}
            <div className="selected-items">
                <h3>Selected Items:</h3>
                <ul>
                    {selectedItems.map((item, index) => (
                        <li key={index}>
                            <span>{item[name]}</span>
                            <button onClick={() => toggleItemSelection(item)}>Remove</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
