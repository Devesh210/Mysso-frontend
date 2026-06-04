import React, { useState } from 'react';
import axios from 'axios';

const AddPlan = () => {
  const [formData, setFormData] = useState({ name: '', data: [] });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/jobportal/addPlan', formData);
      alert(response.data.message);
    } catch (error) {
      console.error(error);
      alert('Error adding plan');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Plan Name" />
      {/* You can add more fields here for `data` */}
      <button type="submit">Add Plan</button>
    </form>
  );
};

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PlanList = () => {
  const [plans, setPlans] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    fetchPlans();
  }, [page, limit]);

  const fetchPlans = async () => {
    try {
      const response = await axios.get(`/api/jobportal/planList?page=${page}&limit=${limit}`);
      setPlans(response.data.data);
    } catch (error) {
      console.error(error);
      alert('Error fetching plans');
    }
  };

  return (
    <div>
      <h2>Plan List</h2>
      <ul>
        {plans.map(plan => (
          <li key={plan._id}>{plan.name}</li>
        ))}
      </ul>
      <button onClick={() => setPage(page - 1)} disabled={page === 1}>Previous</button>
      <button onClick={() => setPage(page + 1)}>Next</button>
    </div>
  );
};
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PlanDetails = ({ planId }) => {
  const [plan, setPlan] = useState(null);

  useEffect(() => {
    fetchPlanDetails();
  }, [planId]);

  const fetchPlanDetails = async () => {
    try {
      const response = await axios.get(`/api/jobportal/getPlandetailsbyid?id=${planId}`);
      setPlan(response.data.data);
    } catch (error) {
      console.error(error);
      alert('Error fetching plan details');
    }
  };

  return (
    <div>
      {plan ? (
        <div>
          <h3>{plan.name}</h3>
          {/* Render other plan details here */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

import React, { useState } from 'react';
import axios from 'axios';

const UpdatePlan = ({ planId }) => {
  const [formData, setFormData] = useState({ id: planId, name: '', price: '', content: '', position: '', status: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put('/api/jobportal/planUpdate', formData);
      alert(response.data.message);
    } catch (error) {
      console.error(error);
      alert('Error updating plan');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Plan Name" />
      <input type="text" name="price" value={formData.price} onChange={handleChange} placeholder="Plan Price" />
      <input type="text" name="content" value={formData.content} onChange={handleChange} placeholder="Plan Content" />
      <input type="text" name="position" value={formData.position} onChange={handleChange} placeholder="Plan Position" />
      <select name="status" value={formData.status} onChange={handleChange}>
        <option value="">Select Status</option>
        <option value="1">Active</option>
        <option value="0">Inactive</option>
      </select>
      <button type="submit">Update Plan</button>
    </form>
  );




export {AddPlan,PlanList,PlanDetails,UpdatePlan
