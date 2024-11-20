const academicProgramsData = {
    elementary: {
        coreSubjects: [
            'English Language and Literature',
            'Mathematics',
            'Science and Technology',
            'Filipino',
            'Social Studies'
        ],
        specialPrograms: [
            'Science and Technology Program',
            'Arts and Music Program',
            'Sports Development Program'
        ],
        supportServices: [
            'Guidance and Counseling',
            'Learning Resource Center',
            'Health Services',
            'Library Services'
        ],
        facilities: [
            'Science Laboratories',
            'Computer Laboratories',
            'Music Room',
            'Art Studio',
            'Sports Facilities'
        ]
    },
    highSchool: {
        academicPrograms: [
            {
                track: 'Science and Technology Track',
                subjects: ['Advanced Mathematics', 'Research Methods', 'Laboratory Work']
            },
            {
                track: 'Special Science Classes',
                subjects: ['Advanced Biology', 'Advanced Chemistry', 'Advanced Physics']
            }
        ],
        coCurricular: [
            'Science Club',
            'Mathematics Club',
            'Robotics Club',
            'Environmental Club',
            'Sports Teams'
        ],
        resources: [
            'Digital Library',
            'Science Laboratories',
            'Computer Centers',
            'Innovation Hub'
        ]
    },
    seniorHigh: {
        academicTracks: [
            {
                name: 'STEM (Science, Technology, Engineering, and Mathematics)',
                subjects: ['Pre-Calculus', 'Basic Calculus', 'General Chemistry', 'General Physics', 'Research in Physical Sciences']
            },
            {
                name: 'ABM (Accountancy, Business, and Management)',
                subjects: ['Business Mathematics', 'Business Finance', 'Principles of Marketing', 'Business Ethics']
            },
            {
                name: 'HUMSS (Humanities and Social Sciences)',
                subjects: ['Creative Writing', 'World Literature', 'Philippine Politics', 'Social Science Research']
            }
        ],
        specialPrograms: [
            {
                name: 'Research Program',
                details: ['Scientific Research', 'Social Science Research', 'Business Research']
            },
            {
                name: 'Innovation Hub',
                details: ['Technology Innovation', 'Business Innovation', 'Social Innovation']
            },
            {
                name: 'Industry Partnerships',
                details: ['Internship Programs', 'Industry Visits', 'Guest Lectures']
            }
        ]
    },
    college: {
        degreePrograms: [
            'Bachelor of Science in Computer Science',
            'Bachelor of Science in Business Administration',
            'Bachelor of Arts in Communication',
            'Bachelor of Science in Nursing'
        ],
        electiveCourses: [
            'Digital Marketing',
            'Artificial Intelligence',
            'Creative Writing',
            'Entrepreneurship'
        ],
        specialPrograms: [
            {
                name: 'Research Opportunities',
                details: ['Scientific Research', 'Applied Research', 'Collaborative Research']
            },
            {
                name: 'Internship Programs',
                details: ['Local Internships', 'Overseas Internships', 'Virtual Internships']
            }
        ],
        facilities: [
            'Advanced Research Laboratories',
            'Library with Digital Archives',
            'Collaborative Learning Spaces',
            'Industry-Inspired Incubators'
        ]
    }
};

function populateAcademicPrograms() {
    console.log("Populating Academic Programs...");

    const levels = ['elementary', 'highSchool', 'seniorHigh', 'college'];
    levels.forEach(level => {
        const levelContent = document.getElementById(level);
        if (levelContent) {
            console.log(`Populating content for ${level}`);
            let html = `<h3>${level.charAt(0).toUpperCase() + level.slice(1)} Programs</h3>`;
            const data = academicProgramsData[level];

            if (data.coreSubjects) {
                html += `
                    <h4>Core Subjects</h4>
                    <ul>${data.coreSubjects.map(subject => `<li>${subject}</li>`).join('')}</ul>
                `;
            }

            if (data.specialPrograms) {
                html += `
                    <h4>Special Programs</h4>
                    <ul>${data.specialPrograms.map(program => {
                        if (typeof program === 'string') {
                            return `<li>${program}</li>`;
                        } else {
                            return `<li>${program.name}: ${program.details.join(', ')}</li>`;
                        }
                    }).join('')}</ul>
                `;
            }

            if (data.supportServices) {
                html += `
                    <h4>Support Services</h4>
                    <ul>${data.supportServices.map(service => `<li>${service}</li>`).join('')}</ul>
                `;
            }

            if (data.academicPrograms || data.academicTracks || data.degreePrograms) {
                html += `<h4>Academic Tracks / Programs</h4><ul>`;
                if (data.academicPrograms) {
                    html += data.academicPrograms.map(program => `
                        <li>${program.track}: ${program.subjects.join(', ')}</li>
                    `).join('');
                }
                if (data.academicTracks) {
                    html += data.academicTracks.map(track => `
                        <li>${track.name}: ${track.subjects.join(', ')}</li>
                    `).join('');
                }
                if (data.degreePrograms) {
                    html += data.degreePrograms.map(program => `<li>${program}</li>`).join('');
                }
                html += `</ul>`;
            }

            if (data.coCurricular) {
                html += `
                    <h4>Co-Curricular Activities</h4>
                    <ul>${data.coCurricular.map(activity => `<li>${activity}</li>`).join('')}</ul>
                `;
            }

            if (data.resources || data.facilities) {
                html += `
                    <h4>Resources / Facilities</h4>
                    <ul>${(data.resources || []).concat(data.facilities || []).map(resource => `<li>${resource}</li>`).join('')}</ul>
                `;
            }

            levelContent.innerHTML = html;
        } else {
            console.error(`Element with ID '${level}' not found`);
        }
    });
}

document.addEventListener('DOMContentLoaded', populateAcademicPrograms);

document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.tab');
    const tabPanels = document.querySelectorAll('.tab-panel');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs and panels
            tabs.forEach(t => t.classList.remove('active'));
            tabPanels.forEach(panel => panel.classList.remove('active'));

            // Add active class to the clicked tab and corresponding panel
            tab.classList.add('active');
            const target = tab.getAttribute('data-target');
            document.querySelector(target).classList.add('active');
        });
    });
});
