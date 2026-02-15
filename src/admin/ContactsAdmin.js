import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import API from '../utils/api';

const ContactsAdmin = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = async () => {
    try {
      const res = await API.get('/contact');
      setContacts(res.data);
    } catch (err) {
      toast.error('Failed to load contacts');
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await API.put(`/contact/${id}`, { status });
      toast.success('Status updated');
      loadContacts();
    } catch (err) {
      toast.error('Update failed');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this enquiry?')) {
      try {
        await API.delete(`/contact/${id}`);
        toast.success('Enquiry deleted');
        loadContacts();
      } catch (err) {
        toast.error('Delete failed');
      }
    }
  };

  return (
    <div>
      <div className="admin-header">
        <h2>Manage Enquiries</h2>
      </div>

      <div className="data-table">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Message</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map(c => (
              <tr key={c._id}>
                <td>{c.name}</td>
                <td>{c.email}</td>
                <td>{c.phone}</td>
                <td>{c.message}</td>
                <td>
                  <select value={c.status} onChange={(e) => handleStatusChange(c._id, e.target.value)}>
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="converted">Converted</option>
                  </select>
                </td>
                <td className="action-btns">
                  <button className="btn-delete" onClick={() => handleDelete(c._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContactsAdmin;
