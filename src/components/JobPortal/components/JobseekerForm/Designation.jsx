import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setFIlter } from '../redux/jobSlice';
import { useGetAllJobTitleQuery } from '../redux/apiSlice';
import { useDebounce } from '../../../../hooks';

const Designation = ({ values, errors, touched, isSubmitting, setFieldValue }) => {
    const dispatch = useDispatch();
    const { searchedQuery } = useSelector((state) => state.job);
    const [isOpen, setIsOpen] = useState(false);
    const [localQuery, setLocalQuery] = useState(searchedQuery);
    const dropdownRef = useRef(null);

    const debouncedQuery = useDebounce(localQuery, 800); // 800ms debounce

    const { data: getAllJobTitle, isLoading } = useGetAllJobTitleQuery({ searchedQuery: debouncedQuery });

    const handleChange = useCallback((e) => {
        const value = e.target.value;
        setLocalQuery(value);
        setIsOpen(true);
    }, []);

    const handleItemClick = useCallback((title) => {
        setLocalQuery(title);
        dispatch(setFIlter({ type: ['searchedQuery'], value: title }));
        setIsOpen(false);
    }, [dispatch]);

    useEffect(() => {
        dispatch(setFIlter({ type: ['searchedQuery'], value: debouncedQuery }));
    }, [debouncedQuery, dispatch]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const filteredTitles = getAllJobTitle?.data || [];

    return (
        <div className="search-dropdown" ref={dropdownRef}>
            <input
                type="text"
                placeholder="Search by Title"
                value={localQuery}
                className='form-control'
                onChange={handleChange}
                onFocus={() => setIsOpen(true)}
            />
            {isOpen && filteredTitles.length > 0 && !isLoading && (
                <ul className="dropdown-list jobtitleli">
                    {filteredTitles.map((item, index) => (
                        <li key={index} onClick={() => handleItemClick(item.title)}>
                            {item.title}
                        </li>
                    ))}
                </ul>
            )}
            {isLoading && <div className="loading">Loading...</div>}
        </div>
    );
};

export default Designation;