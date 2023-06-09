import React, { useEffect, useState } from "react";
import axios from "axios";
import {Typography } from "@mui/material";
import CountUp from "react-countup";
import { format } from  "date-fns";
import Charts from "./donut-chart.js";
import ReactPaginate from 'react-paginate';
import { AiFillLeftCircle, AiFillRightCircle } from "react-icons/ai"; 
import { IconContext } from "react-icons";
import "./pagination.css";

const token = localStorage.getItem("token");


const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  
  async function allProjects() {
    const allProject = await axios(
      `http://localhost:5000/project`,
      {
        ...config,
        method: "GET",
      }
    );
    //console.log({allProject})
    const project = allProject.data.onGoingProjects[0].count;

  return project;
  }

  async function completedProject() {
    const projects = await axios(
      `http://localhost:5000/project`,
      {
        ...config,
        method: "GET",
      }
    );
    //console.log({projects})
    const project = projects.data.completedProjects[0].count;

  return project;
  }

  async function overdueProjects() {
    const projects = await axios(
      `http://localhost:5000/project`,
      {
        ...config,
        method: "GET",
      }
    );
    //console.log({projects})
    const project = projects.data.overdueProjects[0].count;

  return project;
  }

  async function projectList() {
    const projects = await axios(
      `http://localhost:5000/project`,
      {
        ...config,
        method: "GET",
      }
    );
    //console.log({projects})
    const project = projects.data.inProgressProjects;

  return project;
  }

  async function getCurrentUser() {
    const currentUser = await axios(`http://localhost:5000/user/current`, {
      ...config,
      method: "GET",
    });
  
    const data = currentUser.data;
    return data;
  }
  
const ProjectDetails = () => {

  
    const [projectCount, setProjectCount] = useState();
    const [currentUser, setCurrentUser] = useState(null);
    const [countAll, setCountAll] = useState();
    const [overdueCount, setOverdueCount] = useState();
    const [projectLists, setProjectLists] = useState();
    const [currentPage, setCurrentPage] = useState(0);

   // console.log("all states", {projectCount, currentUser, countAll, overdueCount, projectLists, currentPage})

    const projectsPerPage = 5;

    let displayedProjects = [];
    let pageCount = 0;
    if (projectLists) {
      pageCount = Math.ceil(projectLists.length / projectsPerPage);
      displayedProjects = projectLists.slice(currentPage * projectsPerPage, (currentPage + 1) * projectsPerPage);
    }
    
     useEffect(() => {
        allProjects().then((projects) => setCountAll(projects));
    }, []);
      console.log({countAll});
      useEffect(() => {
        completedProject().then((allProject) => setProjectCount(allProject))
        // .then(async () => {
        //   const currentUser = await getCurrentUser();
        //   setCurrentUser(currentUser);
        // });
    }, []);
     // console.log({projectCount});
      useEffect(() => {
        overdueProjects().then((projects) => setOverdueCount(projects));
    }, []);
      //console.log({overdueCount})
      useEffect(() => {
        projectList().then((projects) => setProjectLists(projects));
    }, []);
     console.log({projectLists})
   return (
    <div>
    <div class="container-fluid p-0" style={{ marginTop:"30px" }}>
          
          <div class="row" style={{position:"relative"}}>
           <div class="col-12">
             <div class="page-title-box d-sm-flex align-items-center justify-content-between">
          
          <h4 class="mb-2.5 sm-0"style={{fontSize:"30px",paddingLeft:"0.7rem", fontWeight:"400"}}>Projects</h4>
        </div> 
         </div>
           </div>
           </div>

           <div>
        <div className="cards" style={{
             display:"flex", flexWrap:"wrap"
            
           }}>
           
             <div class="col-xl-4">
             
                   <div class="card card-animate" style={{borderRadius:"15px"}}>
                   <div className="Cardbox">
                       <div class="card-body" style={{ padding: "15px" }}>
                           <div class="d-flex align-items-center">
                               <div class="avatar-sm flex-shrink-0">
                                   <span class="avatar-title bg-soft-primary text-primary rounded-2 fs-2">
                                       <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-award text-warning"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg>
                                   </span>
                               </div>
                               <div class="flex-grow-1 ms-3">
                                   <p class="text-uppercase fw-medium mb-3">Total Projects Completed</p>
                                   <div class="d-flex align-items-center mb-3">
                                       <h4 class="fs-2 flex-grow-1 mb-0">
                                       <i class="ri-arrow-down-s-line fs-13 align-middle me-1"></i>
                                       <CountUp start={ 0 } end={ projectCount } duration={ 2.75 } separator="," />
                                       </h4>                               
                                   </div>
                                   <p class="mb-0">Completed project this month</p>
                               </div>
                           </div>
                       </div>
                       {/* <!-- end card body --> */}
                   </div>
               </div>
               {/* <!-- end col --> */}
               </div>

               <div class="col-xl-4">
                   <div class="card card-animate" style={{borderRadius:"15px"}}>
                    <div className="Cardbox1">
                       <div class="card-body" style={{ padding: "15px" }}>
                           <div class="d-flex align-items-center">
                               <div class="avatar-sm flex-shrink-0">
                                   <span class="avatar-title bg-soft-primary text-primary rounded-2 fs-2">
                                       <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-award text-warning"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg>
                                   </span>
                               </div>
                               <div class="flex-grow-1 ms-3">
                                   <p class="text-uppercase fw-medium mb-3">Total Ongoing Projects</p>
                                   <div class="d-flex align-items-center mb-3">
                                       <h4 class="fs-2 flex-grow-1 mb-0">
                                       <i class="ri-arrow-down-s-line fs-13 align-middle me-1"></i>
                                       <CountUp start={ 0 } end={ countAll } duration={ 2.75 } separator="," />
                                       </h4>                               
                                   </div>
                                   <p class="mb-0">Ongoing project this month</p>
                               </div>
                           </div>
                       </div>
                       {/* <!-- end card body --> */}
                   </div>
               </div>
               {/* <!-- end col --> */}
               </div>


               <div class="col-xl-4">
                   <div class="card card-animate" style={{borderRadius:"15px"}}>
                    <div className="Cardbox2">
                       <div class="card-body" style={{ padding: "15px" }}>
                           <div class="d-flex align-items-center">
                               <div class="avatar-sm flex-shrink-0">
                                   <span class="avatar-title bg-soft-primary text-primary rounded-2 fs-2">
                                       <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-award text-warning"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg>
                                   </span>
                               </div>
                               <div class="flex-grow-1 ms-3">
                                   <p class="text-uppercase fw-medium mb-3">Total Overdue Projects</p>
                                   <div class="d-flex align-items-center mb-3">
                                       <h4 class="fs-2 flex-grow-1 mb-0">
                                       <i class="ri-arrow-down-s-line fs-13 align-middle me-1"></i>
                                       <CountUp start={ 0 } end={ overdueCount } duration={ 2.75 } separator="," />
                                       </h4>                               
                                   </div>
                                   <p class="mb-0">Overdue project this month</p>
                               </div>
                           </div>
                       </div>
                       {/* <!-- end card body --> */}
                   </div>
               </div>
               {/* <!-- end col --> */}
               </div>
       
               </div>
               <div >
               <div className="project">
                <div>
               <div   class= "col-xl-12" style={{ marginTop:"50px" }}>
               
                            <div class="card card-height-100">
                                <div class="card-header d-flex align-items-center" >
                                    <h4 class="card-title flex-grow-1 mb-0">Active Projects</h4>
                                    <div class="flex-shrink-0">
                                        <a href="javascript:void(0);" class="btn btn-soft-info btn-sm">Export Report</a>
                                    </div>
                                </div>
                              {/* <!-- end cardheader --> */}
                                  <div class="card-body">
                                  <div class="table-responsive table-card">
                                  <table class="table table-nowrap table-centered align-middle">
                                            <thead class="bg-light text-muted">
                                                <tr>
                                                    <th scope="col">Project Name</th>
                                                   
                                                    <th scope="col" >Due Date</th>
                                                    <th scope="col">Status</th>
                                              </tr>
                                              {/* <!-- end tr --> */}
                                          </thead>    
                                      
                                                <tbody >
                                                          {displayedProjects && displayedProjects.map((task) => (
                                                              <tr key={task._id}>
                                                              <td>{task.title}</td>
                                                              <td>{format(new Date(task.dueDate2), "dd MMM, yyyy")}</td>
                                                              <td>{task.state}</td>
                                                              </tr>
                                                                 ))}
                                                  </tbody>
</table>
<ReactPaginate
   previousLabel={
    <IconContext.Provider value={{ color: "#8e48d4", size: "36px" }}>
      <AiFillLeftCircle />
    </IconContext.Provider>
  }
  nextLabel={
    <IconContext.Provider value={{ color: "#8e48d4", size: "36px" }}>
      <AiFillRightCircle />
    </IconContext.Provider>
  }
    breakLabel={'...'}
    breakClassName={'break-me'}
    pageCount={pageCount}
    marginPagesDisplayed={2}
    pageRangeDisplayed={5}
    onPageChange={({ selected }) =>
    setCurrentPage(selected)}
    containerClassName={"pagination"}
    pageClassName={"page-item"}
    activeClassName={"page-active"}
  /> 
                                             </div>
                                         </div>
                                     </div>
                                
                           </div> 
                           
                          </div>
                          <div>
<Charts />
</div> 
</div>
</div>

                                
        
</div>
  </div>
  );
};

export default ProjectDetails;