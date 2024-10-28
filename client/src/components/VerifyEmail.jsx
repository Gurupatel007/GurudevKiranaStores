import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { api } from '../services/api';

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const verifyEmail = async () => {
      const token = searchParams.get('token');
      if (token) {
        try {
          await api.verifyEmail(token);
          setMessage('Email verified successfully. Redirecting to login...');
          setTimeout(() => {
            navigate('/login');
          }, 3000);
        } catch (error) {
          setMessage('Invalid or expired token.');
        }
      } else {
        setMessage('No token provided.');
      }
    };

    verifyEmail();
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Email Verification
          </h2>
        </div>
        <div className="mt-8 space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-center text-gray-700">{message}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;