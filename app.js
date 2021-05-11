let API = "https://remotive.io/api/remote-jobs?limit=10";
const jobListing = document.querySelector(".job-listing");
const jobInfo = document.querySelector(".details");
const software = document.querySelector(".software");
const design = document.querySelector(".design");
const hr = document.querySelector(".hr");
const medi = document.querySelector(".medi");
const rightPane = document.querySelector(".right-pane");
let jobs, jobDetails, jobsIsLoading=true, loadingIndicator=jobListing.querySelector('.loading-jobs') ;

const loading=(status, indicator)=>{
  return new Promise((resolve, reject)=>{
    if(status){
      reject(indicator.style.opacity=1);
    // indicator.style.opacity=1
    }
    else{
      resolve(indicator.style.opacity=0)
      // indicator.style.opacity=0
    }
  })
}

function truncate(str, num) {
  if (num > str.length) {
    return str;
  }
  return str.slice(0, num) + "...";
}
function check(val) {
  if (val === "") {
    return "Unavailble";
  } else {
    return val;
  }
}

async function fetchJobs(api) {
 await fetch(api)
    .then((res) => res.json())
    .then((data) => {
       jobs = data.jobs;
      jobs.forEach((data) => {
        // Destructured JSON obect;
        const {stringify} =JSON ;
        let job = document.createElement("div");
        job.classList.add("job");
        // Everthing you want to display will / should be passed to the data- atrribute of the element with the class of  detail < > :)
        job.innerHTML = `
              <div class="details" data-job-company-name=${data.company_name} >
                <div class="left">
                  <div class="logo">
                  <img src=${data.company_logo_url}/>
                  </div>
                  <div class="company">
                    <p class="job-title">
                    ${truncate(data.title, 25)}
                    </p>
                    <small class="company-name">${data.company_name}</small>
                  </div>
                </div>
                <div class="middle">
                  <p class="location">${check(
                    truncate(data.candidate_required_location, 15)
                  )}</p>
                  <small>Location</small>
                </div>
                <div class="right">
                  <p class="salary">${check(data.salary)}</p>
                  <small>Salary</small>
                </div>
              </div>
          `;
        jobListing.appendChild(job);
      });
    });


}
fetchJobs(API);
// created an instance of muation to watch the joblisting NODE ;
// cause it take a litle bit to fetch from the API
const mutation= new MutationObserver((observe)=>{
  // console.log(observe);

  
try{
  //  get all job details gotten from the api 
  jobDetails=jobListing.querySelectorAll('.job-listing .job');
if(jobDetails.length>0){
  // remove a loading image or something...
  // You get :D ;
  jobsIsLoading=false
  loading(jobsIsLoading, loadingIndicator).then((e)=>{
console.log(e);
  }).catch(e=>{
    console.log(e);
  })
}
  // iterate through the job listings
  jobDetails.forEach((jobDetail, i)=>{
    // add a click event on each job listing
    jobDetail.addEventListener('click',()=>{
    const detail =jobDetail.querySelector('.details');

    // 
   let  JobFullDetail= `
      <div class="company-info">
        <div class="logo">${detail.dataset.jobCompanyName}</div>
        <p class="company-name">Name</p>
    </div>`;


    rightPane.querySelector('.container').innerHTML=JobFullDetail

    })
  })
  

  // Try block ends here
 }
catch(err){
  // create fallback error logic either to console or a ui to be displayed 
  console.log(err);
}
})

mutation.observe(jobListing,{
  childList:true
})

