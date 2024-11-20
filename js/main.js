// Gallery Data
const galleryItems = [
    { id: 1, src: '/assets/images/gallery1.jpg', title: 'Campus Building', description: 'Main academic building' },
    { id: 2, src: '/assets/images/gallery2.jpg', title: 'Laboratory', description: 'Advanced research laboratory' },
    { id: 3, src: '/assets/images/gallery3.jpg', title: 'Library', description: 'Modern library facility' },
    { id: 4, src: '/assets/images/gallery4.jpg', title: 'Student Life', description: 'Students in campus' },
    { id: 5, src: '/assets/images/gallery5.jpg', title: 'Research Center', description: 'Science research center' },
    { id: 6, src: '/assets/images/gallery6.jpg', title: 'Sports Complex', description: 'Athletic facilities' }
];

// Faculty Data
const facultyMembers = [
    { name: 'Dr. Maria Santos', title: 'Dean of Science', image: '/assets/images/faculty1.jpg' },
    { name: 'Dr. James Rodriguez', title: 'Head of Research', image: '/assets/images/faculty2.jpg' },
    { name: 'Dr. Anna Lee', title: 'Professor of Technology', image: '/assets/images/faculty3.jpg' }
];

// Announcements Data
const announcements = [
    { title: 'New Research Grant', date: '2024-02-15', content: 'DLSU-STC receives major research grant.' },
    { title: 'Academic Excellence', date: '2024-02-10', content: 'Students win international competition.' },
    { title: 'Campus Update', date: '2024-02-05', content: 'New laboratory equipment installation.' }
];

// Initialize Gallery
function initializeGallery() {
    const galleryGrid = document.getElementById('gallery-grid');
    if (galleryGrid) {
        galleryGrid.innerHTML = galleryItems.map(item => `
            <div class="col-md-4 col-sm-6 gallery-item">
                <img src="${item.src}" 
                     alt="${item.title}"
                     class="img-fluid"
                     data-bs-toggle="modal"
                     data-bs-target="#imageModal"
                     data-title="${item.title}"
                     data-description="${item.description}">
            </div>
        `).join('');

        // Initialize Modal Events
        const imageModal = document.getElementById('imageModal');
        if (imageModal) {
            imageModal.addEventListener('show.bs.modal', function (event) {
                const button = event.relatedTarget;
                const title = button.getAttribute('data-title');
                const description = button.getAttribute('data-description');
                const modalTitle = this.querySelector('.modal-title');
                const modalImage = this.querySelector('.modal-body img');
                
                modalTitle.textContent = title;
                modalImage.src = button.src;
                modalImage.alt = title;
            });
        }
    }
}

// Initialize Faculty Section
function initializeFaculty() {
    const facultyCards = document.getElementById('faculty-cards');
    if (facultyCards) {
        facultyCards.innerHTML = facultyMembers.map(faculty => `
            <div class="col-md-4 mb-4">
                <div class="card faculty-card hover-effect">
                    <img src="${faculty.image}" class="card-img-top" alt="${faculty.name}">
                    <div class="card-body">
                        <h5 class="card-title">${faculty.name}</h5>
                        <p class="card-text">${faculty.title}</p>
                    </div>
                </div>
            </div>
        `).join('');
    }
}

// Initialize Announcements
function initializeAnnouncements() {
    const announcementsSection = document.getElementById('announcements');
    if (announcementsSection) {
        announcementsSection.innerHTML = announcements.map(announcement => `
            <div class="col-md-4 mb-4">
                <div class="card announcement-card hover-effect">
                    <div class="card-body">
                        <h5 class="card-title">${announcement.title}</h5>
                        <p class="card-text">${announcement.content}</p>
                        <small class="text-muted">${new Date(announcement.date).toLocaleDateString()}</small>
                    </div>
                </div>
            </div>
        `).join('');
    }
}

// Contact Form Handler
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Add form submission logic here
            alert('Thank you for your message. We will get back to you soon!');
            contactForm.reset();
        });
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeGallery();
    initializeFaculty();
    initializeAnnouncements();
    initializeContactForm();
});