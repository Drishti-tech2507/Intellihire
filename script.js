function handleCredentialResponse(response) {
    console.log("Encoded JWT ID token:", response.credential);
    alert("Login successful! Token received.");
  }
  
  window.onload = function () {
    // Google Sign-In
    google.accounts.id.initialize({
      client_id: "860906224301-li1st4dstip1ghj68pc4rkh4eelcif58.apps.googleusercontent.com",
      callback: handleCredentialResponse
    });
  
    google.accounts.id.renderButton(document.getElementById("google-signin-btn"), {
      theme: "outline",
      size: "large"
    });
  
    google.accounts.id.prompt();
  
    // Smooth scroll for other navbar links
    document.querySelectorAll('.navbar a').forEach(link => {
      const href = link.getAttribute('href');
      if (href.startsWith("#")) {
        link.addEventListener('click', function (e) {
          e.preventDefault();
          const targetId = href.substring(1);
          const target = document.getElementById(targetId);
          if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
          }
        });
      }
    });
  
    // Replace 'Category' link behavior with dropdown toggle
    const categoryLink = document.querySelector('.navbar a[href*="schedule.html"]');
    const dropdown = document.querySelector('.group .absolute');
    if (categoryLink && dropdown) {
      categoryLink.addEventListener('click', (e) => {
        e.preventDefault();
        dropdown.classList.toggle('hidden');
      });
    }
  
    // Time slots to display
    const times = [
      "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
      "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM",
      "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM", "5:00 PM"
    ];
  
    // Handle role selection and scheduler rendering
    document.querySelectorAll('.group .absolute a').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        dropdown.classList.add('hidden');
  
        const role = link.getAttribute('href').substring(1);
        const container = document.getElementById(role);
        container.innerHTML = '';
  
        const template = document.getElementById('scheduler-template').content.cloneNode(true);
        template.querySelector('.role-name').textContent = role.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  
        const timeContainer = template.querySelector('.time-slots');
        let selectedDate = '', selectedTime = '';
  
        times.forEach(t => {
          const btn = document.createElement('button');
          btn.textContent = t;
          btn.className = 'border rounded py-1 px-2 text-sm hover:bg-blue-100';
          btn.addEventListener('click', (event) => {
            selectedTime = t;
            const scheduler = event.target.closest('.scheduler');
            scheduler.querySelector('.selected-time').textContent = t;
            scheduler.querySelector('.confirm-btn').disabled = !(selectedDate && selectedTime);
  
            scheduler.querySelectorAll('.time-slots button').forEach(b => b.classList.remove('bg-blue-100'));
            btn.classList.add('bg-blue-100');
          });
          timeContainer.appendChild(btn);
        });
  
        const datePicker = template.querySelector('.date-picker');
        datePicker.addEventListener('change', (e) => {
          selectedDate = e.target.value;
          const scheduler = e.target.closest('.scheduler');
          scheduler.querySelector('.selected-date').textContent = selectedDate;
          scheduler.querySelector('.confirm-btn').disabled = !(selectedDate && selectedTime);
        });
  
        template.querySelector('.confirm-btn').addEventListener('click', () => {
          alert(`Your interview for ${role.replace(/-/g, ' ')} has been scheduled on ${selectedDate} at ${selectedTime}. Please mark it on your calendar.`);
        });
  
        container.appendChild(template);
        container.scrollIntoView({ behavior: 'smooth' });
      });
    });
  
    // Additional buttons
    const getStartedBtn = document.querySelector('.btn-2');
    const howItWorksHeading = document.querySelector('.home-content h2');
    if (getStartedBtn && howItWorksHeading) {
      getStartedBtn.addEventListener('click', () => {
        howItWorksHeading.scrollIntoView({ behavior: 'smooth' });
      });
    }
  
    const loginBtn = document.querySelector('.btn-1');
    if (loginBtn) {
      loginBtn.addEventListener('click', () => {
        alert('Redirecting to login page...');
      });
    }
  
    const contactBtn = document.querySelector('.contact');
    if (contactBtn) {
      contactBtn.addEventListener('click', () => {
        alert('You can contact us at: your-email@example.com');
      });
    }
  };
  
    
    
    
    
    