
import React from 'react';
import { Layout } from '@/components/Layout';
import { RegisterForm } from '@/components/auth/RegisterForm';

const Register: React.FC = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          <RegisterForm />
        </div>
      </div>
    </Layout>
  );
};

export default Register;
