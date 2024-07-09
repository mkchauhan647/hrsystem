// validators.js

const validateEmail = (email) => {
    // Regular expression to validate email format
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
};

const validatePhone = (phone) => {
    // Regular expression to validate phone number format (for demonstration purposes)
    const re = /^[0-9]{10}$/; // Assuming a 10-digit phone number format
    return re.test(String(phone).toLowerCase());
};

const validateCandidateForm = (formData) => {
    // Validate required fields
    if (!formData.name || !formData.email || !formData.phone || !formData.education || !formData.experience || !formData.skills) {
        return false;
    }
    // Validate email and phone format
    if (!validateEmail(formData.email) || !validatePhone(formData.phone)) {
        return false;
    }
    return true;
};

export default {
    validateEmail,
    validatePhone,
    validateCandidateForm
};
