import React from "react";
import styled from "styled-components";
import DashboardSidebar from "./DashboardSidebar";
import MainContent from "./MainContent";

const AdminDashboard = () => {
  return (
    <Container>
      <DashboardSidebar />
      <MainContent />
    </Container>
  );
};

const Container = styled.div`
  margin: 0.7rem;
  display: flex;
  height: 97vh;
  background: linear-gradient(to bottom right, white 0%, #e6e4ff 70%);
  border-radius: 2rem;
`;

export default AdminDashboard;
