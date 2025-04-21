<?php
session_start();

// Simple authentication (in a real application, use a more secure method)
$username = "admin";
$password = "admin123"; // Change this to a secure password

// Check if the user is logged in
$isLoggedIn = false;
if (isset($_SESSION['loggedIn']) && $_SESSION['loggedIn'] === true) {
    $isLoggedIn = true;
} else if (isset($_POST['username']) && isset($_POST['password'])) {
    // Validate credentials
    if ($_POST['username'] === $username && $_POST['password'] === $password) {
        $_SESSION['loggedIn'] = true;
        $isLoggedIn = true;
    } else {
        $loginError = "Invalid username or password";
    }
}

// Logout functionality
if (isset($_GET['logout'])) {
    session_destroy();
    header('Location: admin.php');
    exit;
}

// Function to get enrollments from JSON file
function getEnrollments() {
    $jsonFile = 'enrollments.json';
    if (file_exists($jsonFile)) {
        $jsonData = file_get_contents($jsonFile);
        if (!empty($jsonData)) {
            return json_decode($jsonData, true);
        }
    }
    return array();
}

// Get enrollments if logged in
$enrollments = $isLoggedIn ? getEnrollments() : array();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Dashboard - Course Enrollments</title>
    <style>
        :root {
            --primary-color: #2196f3;
            --secondary-color: #0d8aee;
            --text-color: #333;
            --light-gray: #f5f5f5;
            --border-color: #ddd;
        }
        
        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: var(--text-color);
            background-color: var(--light-gray);
            padding: 20px;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            background-color: white;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }
        
        .header {
            background-color: var(--primary-color);
            color: white;
            padding: 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .header h1 {
            font-size: 24px;
        }
        
        .logout-btn {
            background-color: white;
            color: var(--primary-color);
            border: none;
            padding: 8px 15px;
            border-radius: 5px;
            cursor: pointer;
            font-weight: bold;
            text-decoration: none;
        }
        
        .logout-btn:hover {
            background-color: #f0f0f0;
        }
        
        .login-form {
            max-width: 400px;
            margin: 50px auto;
            padding: 30px;
            background-color: white;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
        
        .login-form h2 {
            margin-bottom: 20px;
            text-align: center;
            color: var(--primary-color);
        }
        
        .form-group {
            margin-bottom: 20px;
        }
        
        .form-group label {
            display: block;
            margin-bottom: 5px;
            font-weight: bold;
        }
        
        .form-group input {
            width: 100%;
            padding: 10px;
            border: 1px solid var(--border-color);
            border-radius: 5px;
            font-size: 16px;
        }
        
        .login-btn {
            background-color: var(--primary-color);
            color: white;
            border: none;
            padding: 12px 20px;
            border-radius: 5px;
            font-size: 16px;
            cursor: pointer;
            width: 100%;
        }
        
        .login-btn:hover {
            background-color: var(--secondary-color);
        }
        
        .error-message {
            color: red;
            margin-bottom: 15px;
            text-align: center;
        }
        
        .content {
            padding: 20px;
        }
        
        .stats {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            margin-bottom: 30px;
        }
        
        .stat-card {
            background-color: white;
            border-radius: 10px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
            padding: 20px;
            text-align: center;
        }
        
        .stat-card h3 {
            color: var(--primary-color);
            margin-bottom: 10px;
            font-size: 18px;
        }
        
        .stat-card .number {
            font-size: 32px;
            font-weight: bold;
        }
        
        .enrollments-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
            background-color: white;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
            border-radius: 10px;
            overflow: hidden;
        }
        
        .enrollments-table th {
            background-color: var(--primary-color);
            color: white;
            text-align: left;
            padding: 15px;
        }
        
        .enrollments-table td {
            padding: 15px;
            border-top: 1px solid var(--border-color);
        }
        
        .enrollments-table tr:nth-child(even) {
            background-color: var(--light-gray);
        }
        
        .enrollments-table tr:hover {
            background-color: #e9f5fe;
        }
        
        .search-box {
            padding: 10px;
            margin-bottom: 20px;
            width: 100%;
            border: 1px solid var(--border-color);
            border-radius: 5px;
            font-size: 16px;
        }
        
        @media (max-width: 768px) {
            .header {
                flex-direction: column;
                text-align: center;
            }
            
            .header a {
                margin-top: 10px;
            }
            
            .enrollments-table {
                display: block;
                overflow-x: auto;
            }
        }
    </style>
</head>
<body>
    <?php if (!$isLoggedIn): ?>
        <div class="login-form">
            <h2>Admin Login</h2>
            <?php if (isset($loginError)): ?>
                <div class="error-message"><?php echo $loginError; ?></div>
            <?php endif; ?>
            <form method="post" action="">
                <div class="form-group">
                    <label for="username">Username</label>
                    <input type="text" id="username" name="username" required>
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" id="password" name="password" required>
                </div>
                <button type="submit" class="login-btn">Login</button>
            </form>
        </div>
    <?php else: ?>
        <div class="container">
            <div class="header">
                <h1>Course Enrollments Dashboard</h1>
                <a href="?logout=1" class="logout-btn">Logout</a>
            </div>
            
            <div class="content">
                <?php 
                // Calculate statistics
                $totalEnrollments = count($enrollments);
                
                // Count unique courses
                $courses = array();
                foreach ($enrollments as $enrollment) {
                    if (!in_array($enrollment['course'], $courses)) {
                        $courses[] = $enrollment['course'];
                    }
                }
                $totalCourses = count($courses);
                
                // Count enrollments per course
                $courseCounts = array();
                foreach ($enrollments as $enrollment) {
                    if (!isset($courseCounts[$enrollment['course']])) {
                        $courseCounts[$enrollment['course']] = 0;
                    }
                    $courseCounts[$enrollment['course']]++;
                }
                
                // Find most popular course
                $mostPopularCourse = !empty($courseCounts) ? array_search(max($courseCounts), $courseCounts) : 'None';
                ?>
                
                <div class="stats">
                    <div class="stat-card">
                        <h3>Total Enrollments</h3>
                        <div class="number"><?php echo $totalEnrollments; ?></div>
                    </div>
                    <div class="stat-card">
                        <h3>Total Courses</h3>
                        <div class="number"><?php echo $totalCourses; ?></div>
                    </div>
                    <div class="stat-card">
                        <h3>Most Popular Course</h3>
                        <div class="number"><?php echo $mostPopularCourse; ?></div>
                    </div>
                </div>
                
                <input type="text" id="searchInput" class="search-box" placeholder="Search enrollments...">
                
                <table class="enrollments-table" id="enrollmentsTable">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Course</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php if (empty($enrollments)): ?>
                            <tr>
                                <td colspan="5" style="text-align: center;">No enrollments found.</td>
                            </tr>
                        <?php else: ?>
                            <?php foreach (array_reverse($enrollments) as $enrollment): ?>
                                <tr>
                                    <td><?php echo htmlspecialchars($enrollment['date']); ?></td>
                                    <td><?php echo htmlspecialchars($enrollment['course']); ?></td>
                                    <td><?php echo htmlspecialchars($enrollment['name']); ?></td>
                                    <td><?php echo htmlspecialchars($enrollment['email']); ?></td>
                                    <td><?php echo htmlspecialchars($enrollment['phone']); ?></td>
                                </tr>
                            <?php endforeach; ?>
                        <?php endif; ?>
                    </tbody>
                </table>
            </div>
        </div>
        
        <script>
            // Simple search functionality
            document.getElementById('searchInput').addEventListener('keyup', function() {
                const searchValue = this.value.toLowerCase();
                const table = document.getElementById('enrollmentsTable');
                const rows = table.getElementsByTagName('tr');
                
                for (let i = 1; i < rows.length; i++) {
                    let found = false;
                    const cells = rows[i].getElementsByTagName('td');
                    
                    for (let j = 0; j < cells.length; j++) {
                        const cellText = cells[j].textContent.toLowerCase();
                        
                        if (cellText.indexOf(searchValue) > -1) {
                            found = true;
                            break;
                        }
                    }
                    
                    if (found) {
                        rows[i].style.display = '';
                    } else {
                        rows[i].style.display = 'none';
                    }
                }
            });
        </script>
    <?php endif; ?>
</body>
</html>