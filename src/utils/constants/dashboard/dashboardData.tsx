import resultImage from "../../../assets/images/home/result.png";
import transferImage from "../../../assets/images/home/transfer.png";
import enrollmentImage from "../../../assets/images/home/enrollment.png";
import attendanceImage from "../../../assets/images/home/attendance.png";
import performanceImage from "../../../assets/images/home/performance.png";

const studentCards = [
    { label: "Enrollment", icon: enrollmentImage, path: "enrollments" },
    { label: "Attendance", icon: attendanceImage, path: "attendance" },
    { label: "Performance", icon: performanceImage, path: "performance" },
    { label: "Transfer", icon: transferImage, path: "transfer" },
    { label: "Final Result", icon: resultImage, path: "final-result" },
];

const staffCards = [
    { label: "Staff registry", icon: enrollmentImage, path: "enrollments" },
    { label: "Attendance", icon: attendanceImage, path: "attendance" },
    { label: "Transfer", icon: transferImage, path: "transfer" },
    { label: "Re-enroll", icon: resultImage, path: "re-enroll" },
];

const dashboardData = [
    { key: 0, title: "Student", cards: studentCards },
    { key: 1, title: "Staff", cards: staffCards }
]

export { staffCards, studentCards, dashboardData }