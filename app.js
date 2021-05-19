let API = "https://remotive.io/api/remote-jobs?limit=10";
const jobListing = document.querySelector(".job-listing");
const jobInfo = document.querySelector(".details");
const software = document.querySelector(".software");
const design = document.querySelector(".design");
const hr = document.querySelector(".hr");
const medi = document.querySelector(".medi");
const rightPane = document.querySelector(".right-pane");
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

function fetchJobs(api) {
  fetch(api)
    .then((res) => res.json())
    .then((data) => {
      const jobs = data.jobs;
      jobs.forEach((data) => {
        let job = document.createElement("div");
        job.classList.add("job");
        job.innerHTML = `
              <div class="details">
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
        const container = document.createElement("div");
        container.classList.add("container");
        container.innerHTML = `
          <div class="company-info">
            <div class="logo"></div>
            <p class="company-name">${data.company_name}</p>
        </div>`;
        rightPane.append(container);
      });
    });
}
fetchJobs(API);
