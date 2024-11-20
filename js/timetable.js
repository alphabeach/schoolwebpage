document.addEventListener('DOMContentLoaded', function () {
    const gradeSelect = document.getElementById('gradeSelect');
    const termSelect = document.getElementById('termSelect');

    gradeSelect.addEventListener('change', function () {
        termSelect.disabled = false;
    });

    termSelect.addEventListener('change', updateTimetable);

    function updateTimetable() {
        const grade = gradeSelect.value;
        const term = termSelect.value;
        const tableBody = document.querySelector('.timetable-section tbody');

        // Clear existing table content
        tableBody.innerHTML = '';

        // Check if schedule exists for the selected grade and term
        if (scheduleData['Elementary']?.[grade]?.[term]) {
            const schedule = scheduleData['Elementary'][grade][term];
            schedule.forEach(row => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${row.time}</td>
                    <td>${row.monday}</td>
                    <td>${row.tuesday}</td>
                    <td>${row.wednesday}</td>
                    <td>${row.thursday}</td>
                    <td>${row.friday}</td>
                `;
                tableBody.appendChild(tr);
            });
        } else {
            // Show message if no schedule is available
            const tr = document.createElement('tr');
            tr.innerHTML = '<td colspan="6" class="text-center">No schedule available for the selected grade and term</td>';
            tableBody.appendChild(tr);
        }
    }
});

const scheduleData = {
    'Elementary': {
        'Grade 1': {
            'First Term': [
                { time: '7:30 AM', monday: 'English', tuesday: 'Math', wednesday: 'Science', thursday: 'Filipino', friday: 'MAPEH' },
                { time: '9:00 AM', monday: 'Math', tuesday: 'English', wednesday: 'Filipino', thursday: 'Science', friday: 'Values' },
                { time: '10:30 AM', monday: 'Science', tuesday: 'MAPEH', wednesday: 'Math', thursday: 'English', friday: 'Filipino' }
            ],
            'Second Term': [
                { time: '7:30 AM', monday: 'Filipino', tuesday: 'English', wednesday: 'Science', thursday: 'Math', friday: 'MAPEH' },
                { time: '9:00 AM', monday: 'Math', tuesday: 'Science', wednesday: 'English', thursday: 'Filipino', friday: 'Values' },
                { time: '10:30 AM', monday: 'Science', tuesday: 'MAPEH', wednesday: 'Filipino', thursday: 'English', friday: 'Math' }
            ],
            'Third Term': [
                { time: '7:30 AM', monday: 'Math', tuesday: 'Science', wednesday: 'English', thursday: 'Filipino', friday: 'PE' },
                { time: '9:00 AM', monday: 'English', tuesday: 'Math', wednesday: 'Filipino', thursday: 'Science', friday: 'MAPEH' },
                { time: '10:30 AM', monday: 'Science', tuesday: 'MAPEH', wednesday: 'Math', thursday: 'English', friday: 'Filipino' }
            ]
        },
        'Grade 2': {
            'First Term': [
                { time: '7:30 AM', monday: 'English', tuesday: 'Math', wednesday: 'Science', thursday: 'Filipino', friday: 'MAPEH' },
                { time: '9:00 AM', monday: 'Math', tuesday: 'English', wednesday: 'Filipino', thursday: 'Science', friday: 'Values' },
                { time: '10:30 AM', monday: 'Science', tuesday: 'MAPEH', wednesday: 'Math', thursday: 'English', friday: 'Filipino' }
            ],
            'Second Term': [
                { time: '7:30 AM', monday: 'Filipino', tuesday: 'English', wednesday: 'Science', thursday: 'Math', friday: 'MAPEH' },
                { time: '9:00 AM', monday: 'Math', tuesday: 'Science', wednesday: 'English', thursday: 'Filipino', friday: 'Values' },
                { time: '10:30 AM', monday: 'Science', tuesday: 'MAPEH', wednesday: 'Filipino', thursday: 'English', friday: 'Math' }
            ],
            'Third Term': [
                { time: '7:30 AM', monday: 'Math', tuesday: 'Science', wednesday: 'English', thursday: 'Filipino', friday: 'PE' },
                { time: '9:00 AM', monday: 'English', tuesday: 'Math', wednesday: 'Filipino', thursday: 'Science', friday: 'MAPEH' },
                { time: '10:30 AM', monday: 'Science', tuesday: 'MAPEH', wednesday: 'Math', thursday: 'English', friday: 'Filipino' }
            ]
        },
        'Grade 3': {
            'First Term': [
                { time: '7:30 AM', monday: 'English', tuesday: 'Math', wednesday: 'Science', thursday: 'Filipino', friday: 'MAPEH' },
                { time: '9:00 AM', monday: 'Math', tuesday: 'English', wednesday: 'Filipino', thursday: 'Science', friday: 'Values' },
                { time: '10:30 AM', monday: 'Science', tuesday: 'MAPEH', wednesday: 'Math', thursday: 'English', friday: 'Filipino' }
            ],
            'Second Term': [
                { time: '7:30 AM', monday: 'Filipino', tuesday: 'English', wednesday: 'Science', thursday: 'Math', friday: 'MAPEH' },
                { time: '9:00 AM', monday: 'Math', tuesday: 'Science', wednesday: 'English', thursday: 'Filipino', friday: 'Values' },
                { time: '10:30 AM', monday: 'Science', tuesday: 'MAPEH', wednesday: 'Filipino', thursday: 'English', friday: 'Math' }
            ],
            'Third Term': [
                { time: '7:30 AM', monday: 'Math', tuesday: 'Science', wednesday: 'English', thursday: 'Filipino', friday: 'PE' },
                { time: '9:00 AM', monday: 'English', tuesday: 'Math', wednesday: 'Filipino', thursday: 'Science', friday: 'MAPEH' },
                { time: '10:30 AM', monday: 'Science', tuesday: 'MAPEH', wednesday: 'Math', thursday: 'English', friday: 'Filipino' }
            ]
        },
        'Grade 4': {
            'First Term': [
                { time: '7:30 AM', monday: 'English', tuesday: 'Math', wednesday: 'Science', thursday: 'Filipino', friday: 'MAPEH' },
                { time: '9:00 AM', monday: 'Math', tuesday: 'English', wednesday: 'Filipino', thursday: 'Science', friday: 'Values' },
                { time: '10:30 AM', monday: 'Science', tuesday: 'MAPEH', wednesday: 'Math', thursday: 'English', friday: 'Filipino' }
            ],
            'Second Term': [
                { time: '7:30 AM', monday: 'Filipino', tuesday: 'English', wednesday: 'Science', thursday: 'Math', friday: 'MAPEH' },
                { time: '9:00 AM', monday: 'Math', tuesday: 'Science', wednesday: 'English', thursday: 'Filipino', friday: 'Values' },
                { time: '10:30 AM', monday: 'Science', tuesday: 'MAPEH', wednesday: 'Filipino', thursday: 'English', friday: 'Math' }
            ],
            'Third Term': [
                { time: '7:30 AM', monday: 'Math', tuesday: 'Science', wednesday: 'English', thursday: 'Filipino', friday: 'PE' },
                { time: '9:00 AM', monday: 'English', tuesday: 'Math', wednesday: 'Filipino', thursday: 'Science', friday: 'MAPEH' },
                { time: '10:30 AM', monday: 'Science', tuesday: 'MAPEH', wednesday: 'Math', thursday: 'English', friday: 'Filipino' }
            ]
        },
        'Grade 5': {
            'First Term': [
                { time: '7:30 AM', monday: 'English', tuesday: 'Math', wednesday: 'Science', thursday: 'Filipino', friday: 'MAPEH' },
                { time: '9:00 AM', monday: 'Math', tuesday: 'English', wednesday: 'Filipino', thursday: 'Science', friday: 'Values' },
                { time: '10:30 AM', monday: 'Science', tuesday: 'MAPEH', wednesday: 'Math', thursday: 'English', friday: 'Filipino' }
            ],
            'Second Term': [
                { time: '7:30 AM', monday: 'Filipino', tuesday: 'English', wednesday: 'Science', thursday: 'Math', friday: 'MAPEH' },
                { time: '9:00 AM', monday: 'Math', tuesday: 'Science', wednesday: 'English', thursday: 'Filipino', friday: 'Values' },
                { time: '10:30 AM', monday: 'Science', tuesday: 'MAPEH', wednesday: 'Filipino', thursday: 'English', friday: 'Math' }
            ],
            'Third Term': [
                { time: '7:30 AM', monday: 'Math', tuesday: 'Science', wednesday: 'English', thursday: 'Filipino', friday: 'PE' },
                { time: '9:00 AM', monday: 'English', tuesday: 'Math', wednesday: 'Filipino', thursday: 'Science', friday: 'MAPEH' },
                { time: '10:30 AM', monday: 'Science', tuesday: 'MAPEH', wednesday: 'Math', thursday: 'English', friday: 'Filipino' }
            ]
        },
        'Grade 6': {
            'First Term': [
                { time: '7:30 AM', monday: 'English', tuesday: 'Math', wednesday: 'Science', thursday: 'Filipino', friday: 'MAPEH' },
                { time: '9:00 AM', monday: 'Math', tuesday: 'English', wednesday: 'Filipino', thursday: 'Science', friday: 'Values' },
                { time: '10:30 AM', monday: 'Science', tuesday: 'MAPEH', wednesday: 'Math', thursday: 'English', friday: 'Filipino' }
            ],
            'Second Term': [
                { time: '7:30 AM', monday: 'Filipino', tuesday: 'English', wednesday: 'Science', thursday: 'Math', friday: 'MAPEH' },
                { time: '9:00 AM', monday: 'Math', tuesday: 'Science', wednesday: 'English', thursday: 'Filipino', friday: 'Values' },
                { time: '10:30 AM', monday: 'Science', tuesday: 'MAPEH', wednesday: 'Filipino', thursday: 'English', friday: 'Math' }
            ],
            'Third Term': [
                { time: '7:30 AM', monday: 'Math', tuesday: 'Science', wednesday: 'English', thursday: 'Filipino', friday: 'PE' },
                { time: '9:00 AM', monday: 'English', tuesday: 'Math', wednesday: 'Filipino', thursday: 'Science', friday: 'MAPEH' },
                { time: '10:30 AM', monday: 'Science', tuesday: 'MAPEH', wednesday: 'Math', thursday: 'English', friday: 'Filipino' }
            ]
        }
    }
};
