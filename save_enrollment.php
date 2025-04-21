<?php
// Set headers to prevent caching
header('Content-Type: application/json');
header('Cache-Control: no-cache, no-store, must-revalidate');
header('Pragma: no-cache');
header('Expires: 0');

// Initialize response array
$response = array(
    'success' => false,
    'message' => ''
);

// Check if the request method is POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Validate required fields
    if (
        isset($_POST['course']) && !empty($_POST['course']) &&
        isset($_POST['name']) && !empty($_POST['name']) &&
        isset($_POST['email']) && !empty($_POST['email']) &&
        isset($_POST['phone']) && !empty($_POST['phone'])
    ) {
        // Sanitize input data
        $course = htmlspecialchars(trim($_POST['course']));
        $name = htmlspecialchars(trim($_POST['name']));
        $email = htmlspecialchars(trim($_POST['email']));
        $phone = htmlspecialchars(trim($_POST['phone']));
        
        // Create new enrollment data
        $newEnrollment = array(
            'id' => uniqid(),
            'course' => $course,
            'name' => $name,
            'email' => $email,
            'phone' => $phone,
            'date' => date('Y-m-d H:i:s')
        );
        
        // Path to the JSON file
        $jsonFile = 'enrollments.json';
        
        // Initialize enrollments array
        $enrollments = array();
        
        // Check if the JSON file exists
        if (file_exists($jsonFile)) {
            // Read the existing data
            $jsonData = file_get_contents($jsonFile);
            
            // Check if the file is not empty
            if (!empty($jsonData)) {
                // Decode the JSON data
                $enrollments = json_decode($jsonData, true);
                
                // Check if decoding was successful
                if ($enrollments === null) {
                    $enrollments = array();
                }
            }
        }
        
        // Add the new enrollment to the array
        $enrollments[] = $newEnrollment;
        
        // Convert the updated array to JSON
        $jsonData = json_encode($enrollments, JSON_PRETTY_PRINT);
        
        // Save the JSON data to the file
        if (file_put_contents($jsonFile, $jsonData)) {
            $response['success'] = true;
            $response['message'] = 'Enrollment data saved successfully.';
        } else {
            $response['message'] = 'Failed to save enrollment data. Please try again later.';
        }
    } else {
        $response['message'] = 'All fields are required.';
    }
} else {
    $response['message'] = 'Invalid request method.';
}

// Return the response as JSON
echo json_encode($response);
?>