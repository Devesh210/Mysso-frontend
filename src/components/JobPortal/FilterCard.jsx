import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { useGetSubIndustryFiltersQuery, useGetAllFiltersQuery } from '../../redux/apiSlice';
import { handlefilter } from '../../redux/store';
import RangeSlider from './components/RangeSlider';
import ExperienceSlider from './components/ExperienceSlider';
import { reset } from '../../redux/jobSlice';
import SearchDropdown from '../../hooks/SearchDriopdown';
import { useGetFiltersData } from '../../hooks';

const FilterCard = () => {
    const dispatch = useDispatch();
    const search = useGetFiltersData()
    const { location, category, subcategory, jobtypes, min_years, max_years } = useSelector((state) => state.job);

    const { data: allfilters } = useGetAllFiltersQuery();
    const { data: subindustryFilters } = useGetSubIndustryFiltersQuery({ parent: category });

    const handleChange = (name, value) => {
        const data = value ? value.map(option => option.value) : [];
        handlefilter(name, data);
    };

    const renderDynamicFilters = () => {
        if (!allfilters) return null;

        return allfilters.map((item, index) => (
            <div key={index}>
                <Select
                    isMulti
                    options={item.jobTypes}
                    className="mb-4"
                    value={item.jobTypes.filter(option => jobtypes?.includes(option.value))}
                    placeholder="Job Type"
                    onChange={(value) => handleChange("jobtypes", value)}
                />
                <ExperienceSlider
                    initialMin={min_years}
                    initialMax={max_years}
                    label="Experience (Years)"
                    step={1}
                    onChange={(values) => {
                        handlefilter("min_years", values.min);
                        handlefilter("max_years", values.max);
                    }}
                />
                {item.Salary && (
                    <RangeSlider
                        label="Salary (₹) LPA"
                        onChange={(values) => {
                            handlefilter("minSalary", values.minValue);
                            handlefilter("maxSalary", values.maxValue);
                        }}
                    />
                )}
            </div>
        ));
    };

    return (
        <React.Fragment>
            <div className="rounded-md filter-left">
                <h3>Filter Jobs</h3>
                <div className="filter-fields">
                    <div className="input-search-group mb-4">
                        <SearchDropdown />
                    </div>

                    <Select
                        isMulti
                        options={search.locationData || []}
                        value={search.locationData.filter(item => location?.includes(item._id))}
                        className="mb-4"
                        placeholder="Location"
                        onChange={(value) => handleChange("location", value)}
                    />

                    <Select
                        isMulti
                        options={search.industryData || []}
                        value={search.industryData.filter(item => category?.includes(item._id))}
                        className="mb-4"
                        placeholder="Industry"
                        onChange={(value) => {
                            const selectedIndustries = search.industryData.filter(item => category?.includes(item._id))
                            const removedOptions = selectedIndustries?.filter(
                                (prevOption) => !value.some(selected => selected.value === prevOption.value)
                            );
                            if (removedOptions?.length > 0) {
                                const selectedSubIndustries = subindustryFilters.data.filter(item => subcategory?.includes(item.value))
                                const id = removedOptions[0].value;
                                const filteredSubIndustries = selectedSubIndustries.filter(item => item.parent !== id);
                                handleChange("subcategory", filteredSubIndustries);
                            }
                            handleChange("category", value);
                        }}
                    />

                    {subindustryFilters?.data?.length > 0 && (
                        <Select
                            isMulti
                            options={subindustryFilters.data}
                            value={subindustryFilters.data.filter(item => subcategory?.includes(item.value))}
                            className="mb-4"
                            placeholder="Sub-Industry"
                            onChange={(value) => handleChange("subcategory", value)}
                        />
                    )}

                    {renderDynamicFilters()}

                    <button className="enterjobsclear mt-2" onClick={() => dispatch(reset())}>
                        Clear
                    </button>
                </div>
            </div>
        </React.Fragment>
    );
};

export default FilterCard;
