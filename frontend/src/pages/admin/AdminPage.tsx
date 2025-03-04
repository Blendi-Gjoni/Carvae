import PieChart from "../../components/PieChart";
import DoughnutChart from "../../components/DoughnutChart";
import RadarChart from "../../components/RadarChart";

const AdminPage: React.FC = () => {

  return (
    <div className='vh-100'>
      <div className="col-12 p-3">
        <h2>Welcome to the Admin Dashboard</h2>
        <p>This is the content of the admin page.</p>
      </div>
      <div className="m-3 d-flex flex-row">
      <div className="d-flex flex-column justify-content-center align-items-center" style={{width: '500px', height: '300px'}}>
          <h4>User Authorization Roles</h4>
          <RadarChart />
        </div>
        <div className="d-flex flex-column justify-content-center align-items-center" style={{width: '500px', height: '300px'}}>
          <h4>Number of Rentals by city</h4>
          <PieChart />
        </div>
        <div className="d-flex flex-column justify-content-center align-items-center" style={{width: '500px', height: '300px'}}>
          <h4>Number of Dealerships by state</h4>
          <DoughnutChart />
        </div>
      </div>
    </div>
  )
};

export default AdminPage;
