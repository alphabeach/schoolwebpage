// Academic Calendar and Timetable Management
class Calendar {
    constructor(container) {
        this.container = container;
        this.currentDate = new Date();
        this.events = [];
        this.init();
    }

    init() {
        this.loadEvents();
        this.render();
        this.setupControls();
    }

    loadEvents() {
        // Sample academic events - in a real application, this would be loaded from a server
        this.events = [
            {
                title: 'First Term Start',
                date: '2024-08-15',
                type: 'academic'
            },
            {
                title: 'Midterm Examinations',
                date: '2024-10-10',
                type: 'exam'
            },
            {
                title: 'Research Symposium',
                date: '2024-09-20',
                type: 'event'
            }
        ];
    }

    render() {
        const year = this.currentDate.getFullYear();
        const month = this.currentDate.getMonth();

        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        
        let html = `
            <div class="calendar-header">
                <button class="btn btn-link" data-action="prev-month">&lt;</button>
                <h3>${new Date(year, month).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</h3>
                <button class="btn btn-link" data-action="next-month">&gt;</button>
            </div>
            <div class="calendar-grid">
                <div class="calendar-weekdays">
                    ${['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
                        .map(day => `<div class="weekday">${day}</div>`).join('')}
                </div>
                <div class="calendar-days">
        `;

        // Add empty cells for days before the first day of the month
        for (let i = 0; i < firstDay.getDay(); i++) {
            html += '<div class="calendar-day empty"></div>';
        }

        // Add days of the month
        for (let day = 1; day <= lastDay.getDate(); day++) {
            const date = new Date(year, month, day);
            const dateStr = date.toISOString().split('T')[0];
            const dayEvents = this.events.filter(event => event.date === dateStr);
            
            html += `
                <div class="calendar-day ${dayEvents.length ? 'has-events' : ''}" data-date="${dateStr}">
                    <span class="day-number">${day}</span>
                    ${dayEvents.map(event => `
                        <div class="event-dot ${event.type}" title="${event.title}"></div>
                    `).join('')}
                </div>
            `;
        }

        html += `
                </div>
            </div>
        `;

        this.container.innerHTML = html;
    }

    setupControls() {
        this.container.addEventListener('click', (e) => {
            if (e.target.dataset.action === 'prev-month') {
                this.currentDate.setMonth(this.currentDate.getMonth() - 1);
                this.render();
            } else if (e.target.dataset.action === 'next-month') {
                this.currentDate.setMonth(this.currentDate.getMonth() + 1);
                this.render();
            } else if (e.target.closest('.calendar-day')) {
                const day = e.target.closest('.calendar-day');
                const date = day.dataset.date;
                this.showEvents(date);
            }
        });
    }

    showEvents(date) {
        const dayEvents = this.events.filter(event => event.date === date);
        if (dayEvents.length === 0) return;

        const modal = document.createElement('div');
        modal.className = 'modal fade';
        modal.innerHTML = `
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Events on ${new Date(date).toLocaleDateString()}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        ${dayEvents.map(event => `
                            <div class="event-item ${event.type}">
                                <h6>${event.title}</h6>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        const modalInstance = new bootstrap.Modal(modal);
        modalInstance.show();

        modal.addEventListener('hidden.bs.modal', () => {
            modal.remove();
        });
    }
}

// Class Timetable Viewer
class Timetable {
    constructor(container) {
        this.container = container;
        this.currentSchedule = null;
        this.init();
    }

    init() {
        this.loadSchedule();
        this.render();
        this.setupFilters();
    }

    loadSchedule() {
        // Sample schedule data - in a real application, this would be loaded from a server
        this.currentSchedule = {
            'Monday': [
                { time: '08:00-09:30', subject: 'Physics 101', room: 'Lab 1' },
                { time: '10:00-11:30', subject: 'Chemistry 201', room: 'Room 301' }
            ],
            'Wednesday': [
                { time: '13:00-14:30', subject: 'Biology 101', room: 'Lab 2' },
                { time: '15:00-16:30', subject: 'Mathematics 201', room: 'Room 401' }
            ]
        };
    }

    render() {
        const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
        const timeSlots = [
            '08:00-09:30', '10:00-11:30', '13:00-14:30', '15:00-16:30'
        ];

        let html = `
            <div class="timetable">
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th>Time</th>
                            ${days.map(day => `<th>${day}</th>`).join('')}
                        </tr>
                    </thead>
                    <tbody>
        `;

        timeSlots.forEach(timeSlot => {
            html += `
                <tr>
                    <td>${timeSlot}</td>
                    ${days.map(day => {
                        const class_ = this.currentSchedule[day]?.find(c => c.time === timeSlot);
                        return class_ ? `
                            <td class="has-class">
                                <div class="class-info">
                                    <strong>${class_.subject}</strong><br>
                                    ${class_.room}
                                </div>
                            </td>
                        ` : '<td></td>';
                    }).join('')}
                </tr>
            `;
        });

        html += `
                    </tbody>
                </table>
            </div>
        `;

        this.container.innerHTML = html;
    }

    setupFilters() {
        // Add filter controls if needed
        const filterContainer = document.createElement('div');
        filterContainer.className = 'timetable-filters mb-3';
        filterContainer.innerHTML = `
            <select class="form-select" id="courseFilter">
                <option value="">All Courses</option>
                <option value="physics">Physics</option>
                <option value="chemistry">Chemistry</option>
                <option value="biology">Biology</option>
            </select>
        `;

        this.container.insertBefore(filterContainer, this.container.firstChild);

        document.getElementById('courseFilter').addEventListener('change', (e) => {
            // Implement filtering logic here
            this.filterSchedule(e.target.value);
        });
    }

    filterSchedule(course) {
        if (!course) {
            this.loadSchedule();
        } else {
            // Filter the schedule based on the selected course
            const filteredSchedule = {};
            Object.entries(this.currentSchedule).forEach(([day, classes]) => {
                const filteredClasses = classes.filter(c => 
                    c.subject.toLowerCase().includes(course.toLowerCase())
                );
                if (filteredClasses.length > 0) {
                    filteredSchedule[day] = filteredClasses;
                }
            });
            this.currentSchedule = filteredSchedule;
        }
        this.render();
    }
}

// Initialize calendar and timetable when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const calendarContainer = document.getElementById('academicCalendar');
    if (calendarContainer) {
        new Calendar(calendarContainer);
    }

    const timetableContainer = document.getElementById('classTimetable');
    if (timetableContainer) {
        new Timetable(timetableContainer);
    }
});