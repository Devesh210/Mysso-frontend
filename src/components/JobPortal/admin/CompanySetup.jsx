import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { SpinLoader, useGetCompanyById } from "../../../hooks";
import {
  useUpdateCompanyMutation,
  useGetCountryListQuery,
  useGetIndustryFiltersQuery,
} from "../../../redux/apiSlice";
import { Button, Container, Row, Col, Form } from "react-bootstrap";
import {
  Formik,
  FieldArray,
  Field,
  Form as FormikForm,
  ErrorMessage,
} from "formik";
import * as Yup from "yup";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import axios from "axios";
import API_URL from "../../../../config";
import { Link } from "react-router-dom";

const yearsArray = Array.from({ length: 2024 - 1901 + 1 }, (_, i) => 1901 + i);
const totalhirignexpArray = Array.from({ length: 16 }, (_, i) => i);

const levelOptions = [
  { value: "junior", label: "Junior" },
  { value: "mid", label: "Mid" },
  { value: "senior", label: "Senior" },
  { value: "lead", label: "Lead" },
];

const CompanySetup = () => {
  const params = useParams();
  const { data: singleCompany } = useGetCompanyById(params.id);
  const [loading, setLoading] = useState(false);
  const [updateCompany] = useUpdateCompanyMutation();
  const navigate = useNavigate();
  const { data: countryList } = useGetCountryListQuery();
  const { data: industryFilters } = useGetIndustryFiltersQuery();
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [companylogoPreview, setCompanylogoPreview] = useState(
    singleCompany?.logoUrl || ""
  );
  const refs = useRef({});

  const initialValues = {
    name: singleCompany?.name || "",
    currentDesignation: singleCompany?.currentDesignation || "",
    website: singleCompany?.website || "",
    from: singleCompany?.from || "",
    to: singleCompany?.to || "",
    address1: singleCompany?.address1 || "",
    address2: singleCompany?.address2 || "",
    city_id: singleCompany?.city_id || "",
    state_id: singleCompany?.state_id || "",
    country_id: singleCompany?.country_id || "",
    totalExperience: singleCompany?.totalExperience || "",
    levelIHireFor: singleCompany?.levelIHireFor || [],
    industry: singleCompany?.industry || [],
    skills: singleCompany?.skills || [],
    achievement: singleCompany?.achievement || [{ year: "", description: "" }],
    companylogo: null,

    termsOfService: false,
  };

  const validationSchema = Yup.object().shape({
    achievement: Yup.array().of(
      Yup.object({
        year: Yup.string().required("Year is required"),
        description: Yup.string().required("Description is required"),
      })
    ),
    name: Yup.string().required("Company Name is required"),
    currentDesignation: Yup.string().required(
      "Current Designation is required"
    ),
    website: Yup.string()
      .url("Invalid website URL")
      .required("Website is required"),
    from: Yup.number().required("From Year is required"),
    to: Yup.number()
      .required("To Year is required")
      .min(Yup.ref("from"), "To Year must be greater than From Year"),
    address1: Yup.string().required("Address 1 is required"),
    city_id: Yup.string().required("City is required"),
    state_id: Yup.string().required("State is required"),
    country_id: Yup.string().required("Country is required"),
    totalExperience: Yup.string().required(
      "Total Experience in hiring is required"
    ),
    levelIHireFor: Yup.array()
      .min(1, "Select at least one level")
      .required("Level I hire for is required"),
    industry: Yup.array()
      .min(1, "Select at least one industry")
      .max(4, "Select up to 4 industries")
      .required("Industry is required"),
    skills: Yup.array().min(1, "Skills are required"),
    companylogo: Yup.mixed().test(
      "fileSize",
      "File size is too large",
      (value) => {
        if (!value) return true; // Allows empty values
        return value.size <= 5 * 1024 * 1024; // 5MB
      }
    ),

    termsOfService: Yup.boolean().oneOf(
      [true],
      "You must accept the terms of service"
    ),
  });

  const handleCountryChange = async (setFieldValue, value) => {
    const countryId = value;
    setFieldValue("country_id", countryId);
    setFieldValue("state_id", "");
    setFieldValue("city_id", "");

    try {
      const stateRes = await axios.get(
        `${API_URL}/api/getstatebycountry?country_id=${countryId}`
      );
      setStates(stateRes.data.data);
      setCities([]);
    } catch (error) {
      console.error("Error fetching states:", error);
    }
  };

  const handleStateChange = async (setFieldValue, value) => {
    const stateId = value;
    setFieldValue("state_id", stateId);
    setFieldValue("city_id", "");

    try {
      const cityRes = await axios.get(
        `${API_URL}/api/getcitybystate?state_id=${stateId}`
      );
      setCities(cityRes.data.data);
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  const handleFileChange = (e, setFieldValue) => {
    const { name, files } = e.target;
    if (files && files.length > 0) {
      const file = files[0];
      setFieldValue(name, file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setCompanylogoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const submitHandler = async (values, { setSubmitting }) => {
    const formData = new FormData();
    if (values.companylogo) {
      formData.append("companylogo", values.companylogo);
    }
    formData.append("data", JSON.stringify(values));

    try {
      setLoading(true);
      const res = await updateCompany({ id: params.id, formData }).unwrap();
      if (res.success) {
        swal("Success", res.message, "success");
        navigate("/admin/companies");
      }
    } catch (error) {
      swal("Error", error?.data?.message || "An error occurred", "error");
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  useEffect(() => {
    const setInitialCurrentAddress = async () => {
      if (singleCompany) {
        let { country_id, state_id } = singleCompany;
        if (country_id) {
          const stateRes = await axios.get(
            `${API_URL}/api/getstatebycountry?country_id=${country_id}`
          );
          setStates(stateRes.data.data);
        }
        if (state_id) {
          const cityRes = await axios.get(
            `${API_URL}/api/getcitybystate?state_id=${state_id}`
          );
          setCities(cityRes.data.data);
        }
      }
    };
    setInitialCurrentAddress();
  }, [singleCompany]);

  return (
    <Container fluid className="matrimonialform mt-5 mb-5">
      <div className="max-w-xl mx-auto my-10">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          enableReinitialize={true}
          onSubmit={submitHandler}
        >
          {({ isSubmitting, setFieldValue, values, errors, touched }) => (
            <FormikForm>
              <div className="w-full bg-white p-3 rounded-md">
                <div className="filter-left">
                  <h3 className="font-bold companysetup text-xl">
                    Company Setup
                    <Button
                      onClick={() => navigate("/admin/companies")}
                      variant="outline"
                      className="companysetup-back btn btn-primary"
                    >
                      <span>Back</span>
                    </Button>
                  </h3>
                  <div className="grid grid-cols-2 gap-4 p-3">
                    <Row>
                      <Col lg={4}>
                        <Form.Group className="mb-3">
                          <Form.Label>
                            Company Name{" "}
                            <span className="labelerrorssss">*</span>
                          </Form.Label>
                          <Field
                            type="text"
                            name="name"
                            className="form-control"
                            innerRef={(el) => (refs.current["name"] = el)}
                          />
                          <ErrorMessage
                            name="name"
                            component="div"
                            className="text-danger"
                          />
                        </Form.Group>
                      </Col>
                      <Col lg={4}>
                        <Form.Group className="mb-3">
                          <Form.Label>
                            Current Designation{" "}
                            <span className="labelerrorssss">*</span>
                          </Form.Label>
                          <Field
                            type="text"
                            name="currentDesignation"
                            className="form-control"
                            innerRef={(el) =>
                              (refs.current["currentDesignation"] = el)
                            }
                          />
                          <ErrorMessage
                            name="currentDesignation"
                            component="div"
                            className="text-danger"
                          />
                        </Form.Group>
                      </Col>
                      <Col lg={4}>
                        <Form.Group className="mb-3">
                          <Form.Label>
                            Website <span className="labelerrorssss">*</span>
                          </Form.Label>
                          <Field
                            type="text"
                            name="website"
                            className="form-control"
                            innerRef={(el) => (refs.current["website"] = el)}
                          />
                          <ErrorMessage
                            name="website"
                            component="div"
                            className="text-danger"
                          />
                        </Form.Group>
                      </Col>
                      <Col lg={4}>
                        <Form.Group className="mb-3">
                          <Form.Label>
                            Achievements <span className="labelerrorssss">*</span>
                          </Form.Label>
                          <div className="descr-content">
                            <Row>
                              <Col lg={12} className="mb-2">
                                <FieldArray name="achievement">
                                  {({ remove, push }) => (
                                    <div>
                                      {values.achievement &&
                                        values.achievement.length > 0 &&
                                        values.achievement.map(
                                          (achievement, index) => (
                                            <div className="row" key={index}>
                                              <div className="col">
                                                <label
                                                  htmlFor={`achievement-${index}-year`}
                                                >
                                                  Year of Achievement
                                                </label>
                                                <Field
                                                  as="select"
                                                  id={`achievement-${index}-year`}
                                                  name={`achievement[${index}].year`}
                                                  className="form-control"
                                                >
                                                  <option value="">
                                                    Select Year of Achievement
                                                  </option>
                                                  {yearsArray.map((year) => (
                                                    <option
                                                      key={year}
                                                      value={year.toString()}
                                                    >
                                                      {year}
                                                    </option>
                                                  ))}
                                                </Field>
                                                <ErrorMessage
                                                  name={`achievement[${index}].year`}
                                                  component="div"
                                                  className="text-danger"
                                                />

                                                <label
                                                  htmlFor={`achievement-${index}-description`}
                                                >
                                                  Description
                                                </label>
                                                <Field
                                                  as="textarea"
                                                  id={`achievement-${index}-description`}
                                                  name={`achievement[${index}].description`}
                                                  placeholder="Description"
                                                  rows="6"
                                                  className="form-control"
                                                />
                                                <ErrorMessage
                                                  name={`achievement[${index}].description`}
                                                  component="div"
                                                  className="text-danger"
                                                />
                                              </div>
                                              <div className="col">
                                                <button
                                                  type="button"
                                                  className="search-partner add-company mt-0"
                                                  onClick={() => remove(index)}
                                                  aria-label={`Remove achievement ${index + 1
                                                    }`}
                                                >
                                                  X
                                                </button>
                                              </div>
                                            </div>
                                          )
                                        )}
                                      <button
                                        type="button"
                                        className="search-partner add-company mt-0"
                                        onClick={() =>
                                          push({ year: "", description: "" })
                                        }
                                      >
                                        Add More
                                      </button>
                                    </div>
                                  )}
                                </FieldArray>
                              </Col>
                            </Row>
                          </div>
                        </Form.Group>
                      </Col>
                      <Col lg={4}>
                        <div className="profileimgc">
                          <img src={companylogoPreview} alt="Company Logo" />
                          <div
                            className="profilephoto edit"
                            onClick={() =>
                              document.getElementById("companylogo").click()
                            }
                          >
                            <i className="fa fa-edit"></i>
                          </div>
                          <input
                            id="companylogo"
                            type="file"
                            name="companylogo"
                            ref={(el) => (refs.current["companylogo"] = el)}
                            accept=".jpg, .jpeg, .png"
                            style={{ display: "none" }}
                            onChange={(e) => handleFileChange(e, setFieldValue)}
                          />
                        </div>
                        <ErrorMessage
                          name="companylogo"
                          component="div"
                          className="text-danger"
                        />
                      </Col>
                      <Col lg={2}>
                        <Form.Group className="mb-3">
                          <Form.Label>
                            From <span className="labelerrorssss">*</span>
                          </Form.Label>
                          <Field
                            as="select"
                            name="from"
                            className="form-control"
                            innerRef={(el) => (refs.current["from"] = el)}
                          >
                            <option hidden>Select</option>
                            {yearsArray?.map((year) => (
                              <option
                                key={year}
                                value={year}
                                disabled={
                                  values.to > 0 ? year >= values.to : false
                                }
                              >
                                {year}
                              </option>
                            ))}
                          </Field>
                          <ErrorMessage
                            name="from"
                            component="div"
                            className="text-danger"
                          />
                        </Form.Group>
                      </Col>
                      <Col lg={2}>
                        <Form.Group className="mb-3">
                          <Form.Label>
                            To <span className="labelerrorssss">*</span>
                          </Form.Label>
                          <Field
                            as="select"
                            name="to"
                            className="form-control"
                            innerRef={(el) => (refs.current["to"] = el)}
                          >
                            <option hidden>Select</option>
                            {yearsArray?.map((year) => (
                              <option
                                key={year}
                                value={year}
                                disabled={
                                  values.from > 0 ? year <= values.from : false
                                }
                              >
                                {year}
                              </option>
                            ))}
                          </Field>
                          <ErrorMessage
                            name="to"
                            component="div"
                            className="text-danger"
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <h3> Company Address</h3>
                      <Col lg={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>
                            Address 1 <span className="labelerrorssss">*</span>
                          </Form.Label>
                          <Field
                            as="textarea"
                            name="address1"
                            className="form-control"
                            innerRef={(el) => (refs.current["address1"] = el)}
                          />
                          <ErrorMessage
                            name="address1"
                            component="div"
                            className="text-danger"
                          />
                        </Form.Group>
                      </Col>
                      <Col lg={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Address 2</Form.Label>
                          <Field
                            as="textarea"
                            name="address2"
                            className="form-control"
                            innerRef={(el) => (refs.current["address2"] = el)}
                          />
                        </Form.Group>
                      </Col>
                      <Col lg={4}>
                        <Form.Group className="mb-3">
                          <Form.Label>
                            Country <span className="labelerrorssss">*</span>
                          </Form.Label>
                          <Field
                            as="select"
                            name="country_id"
                            className="form-select"
                            onChange={(e) =>
                              handleCountryChange(setFieldValue, e.target.value)
                            }
                            innerRef={(el) => (refs.current["country_id"] = el)}
                          >
                            <option hidden>Select Country</option>
                            {countryList &&
                              countryList?.data?.map((country) => (
                                <option key={country._id} value={country._id}>
                                  {country.country_name}
                                </option>
                              ))}
                          </Field>
                          <ErrorMessage
                            name="country_id"
                            component="div"
                            className="text-danger"
                          />
                        </Form.Group>
                      </Col>
                      <Col lg={4}>
                        <Form.Group className="mb-3">
                          <Form.Label>
                            State <span className="labelerrorssss">*</span>
                          </Form.Label>
                          <Field
                            as="select"
                            name="state_id"
                            className="form-select"
                            onChange={(e) =>
                              handleStateChange(setFieldValue, e.target.value)
                            }
                            innerRef={(el) => (refs.current["state_id"] = el)}
                          >
                            <option hidden>Select State</option>
                            {states?.map((state) => (
                              <option key={state._id} value={state._id}>
                                {state.state_name}
                              </option>
                            ))}
                          </Field>
                          <ErrorMessage
                            name="state_id"
                            component="div"
                            className="text-danger"
                          />
                        </Form.Group>
                      </Col>
                      <Col lg={4}>
                        <Form.Group className="mb-3">
                          <Form.Label>
                            City <span className="labelerrorssss">*</span>
                          </Form.Label>
                          <Field
                            as="select"
                            name="city_id"
                            className="form-select"
                            innerRef={(el) => (refs.current["city_id"] = el)}
                          >
                            <option hidden>Select City</option>
                            {cities?.map((city) => (
                              <option key={city._id} value={city._id}>
                                {city.city_name}
                              </option>
                            ))}
                          </Field>
                          <ErrorMessage
                            name="city_id"
                            component="div"
                            className="text-danger"
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <h3> Hiring Preferences</h3>
                      <Col lg={4}>
                        <Form.Group className="mb-3">
                          <Form.Label>
                            Total Experience in hiring{" "}
                            <span className="labelerrorssss">*</span>
                          </Form.Label>
                          <Field
                            as="select"
                            name="totalExperience"
                            className="form-control"
                            innerRef={(el) =>
                              (refs.current["totalExperience"] = el)
                            }
                          >
                            <option hidden>Select</option>
                            {totalhirignexpArray?.map((year) => {
                              const yearString =
                                year > 14
                                  ? `More than 15 Years`
                                  : year === 0
                                    ? "Less than 1 year"
                                    : year + "+ year";
                              return (
                                <option key={year} value={yearString}>
                                  {yearString}
                                </option>
                              );
                            })}
                          </Field>
                          <ErrorMessage
                            name="totalExperience"
                            component="div"
                            className="text-danger"
                          />
                        </Form.Group>
                      </Col>
                      <Col lg={4}>
                        <Form.Group className="mb-3">
                          <Form.Label>
                            Level I hire for{" "}
                            <span className="labelerrorssss">*</span>
                          </Form.Label>
                          <Select
                            id="levelIHireFor"
                            isMulti
                            options={levelOptions}
                            value={values.levelIHireFor}
                            onChange={(selectedOptions) => {
                              setFieldValue("levelIHireFor", selectedOptions);
                            }}
                            ref={(el) => (refs.current["levelIHireFor"] = el)}
                          />
                          {touched?.company?.levelIHireFor &&
                            errors?.company?.levelIHireFor && (
                              <div className="text-danger">
                                {errors.levelIHireFor}
                              </div>
                            )}
                        </Form.Group>
                      </Col>
                      <Col lg={4}>
                        <Form.Group className="mb-3">
                          <Form.Label>
                            Industry (Max 4){" "}
                            <span className="labelerrorssss">*</span>
                          </Form.Label>
                          {industryFilters?.data?.length > 0 && (
                            <Select
                              id="industry"
                              isMulti
                              options={industryFilters.data}
                              value={values.industry}
                              onChange={(selectedOptions) => {
                                setFieldValue("industry", selectedOptions);
                              }}
                              ref={(el) => (refs.current["industry"] = el)}
                            />
                          )}
                          {touched?.company?.industry &&
                            errors?.company?.industry && (
                              <div className="text-danger">
                                {errors.industry}
                              </div>
                            )}
                        </Form.Group>
                      </Col>
                      <Col lg={12}>
                        <Form.Group className="mb-3">
                          <Form.Label>
                            Skills I hire for{" "}
                            <span className="labelerrorssss">*</span>
                          </Form.Label>
                          <CreatableSelect
                            isMulti
                            name="skills"
                            className="basic-multi-select"
                            classNamePrefix="select"
                            onChange={(selectedOptions) =>
                              setFieldValue("skills", selectedOptions)
                            }
                            value={values.skills}
                            ref={(el) => (refs.current["skills"] = el)}
                          />
                          <ErrorMessage
                            name="skills"
                            component="div"
                            className="text-danger"
                          />
                        </Form.Group>
                      </Col>
                      <Col lg={12}>
                        <div className="field checkbox">
                          <Field
                            type="checkbox"
                            name="termsOfService"
                            innerRef={(el) =>
                              (refs.current["termsOfService"] = el)
                            }
                          />
                          <label>
                            I agree to use the aforesaid details to create my
                            Recruiter Profile &amp; display it on the ShreeSSO site
                            and also agree to be bound by the{" "}
                            <Link to="/terms-and-condition">Terms of Use</Link>{" "}
                            &amp;{" "}
                            <Link to="/privacy-policy">Privacy of ShreeSSO</Link>
                          </label>
                          <ErrorMessage
                            name="termsOfService"
                            component="div"
                            className="text-danger"
                          />
                        </div>
                      </Col>
                    </Row>
                  </div>
                  {loading ? (
                    <div className="text-center">
                      <Button className="w-full my-4 text-center" disabled>
                        <SpinLoader /> Please wait
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center">
                      <Button
                        type="submit"
                        className="search-partner add-company w-full my-4"
                        disabled={isSubmitting}
                      >
                        Update Company
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </FormikForm>
          )}
        </Formik>
      </div>
    </Container>
  );
};

export default CompanySetup;
