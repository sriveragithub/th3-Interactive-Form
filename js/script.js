
// Setting focus on page load
const nameID = document.getElementById('name')
nameID.focus();

// Adding change event listener to job role select so that type box
// appears when selecting the other option and hides when not
// selected.
const jobRoleID = document.getElementById('other-job-role')
const titleID = document.getElementById('title')
jobRoleID.style.display = 'none'
titleID.addEventListener('change', (e) => {
    if (e.target.value == 'other') {
        jobRoleID.style.display = 'block'
    } else {
        jobRoleID.style.display = 'none' 
    }
})