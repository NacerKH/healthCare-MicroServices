// Function to generate the default profile photo URL
module.exports.defaultProfilePhotoUrl = function (name) {
    const trimmedName = name.trim();
    const initials = trimmedName
        .split(' ')
        .map(segment => segment[0])
        .join('');

    const encodedName = encodeURIComponent(initials);
    const apiUrl = `https://ui-avatars.com/api/?name=${encodedName}&color=7F9CF5&background=EBF4FF`;

    return apiUrl;
};
