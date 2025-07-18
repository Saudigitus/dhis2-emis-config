import resultImage from "../../../assets/images/home/result.png";
import transferImage from "../../../assets/images/home/transfer.png";
import enrollmentImage from "../../../assets/images/home/enrollment.png";
import attendanceImage from "../../../assets/images/home/attendance.png";
import performanceImage from "../../../assets/images/home/performance.png";

const studentCards = [
    { key: "registration", label: "Enrollment", icon: enrollmentImage, path: "enrollments" },
    { key: "attendance", label: "Attendance", icon: attendanceImage, path: "attendance" },
    { key: "performance", label: "Performance", icon: performanceImage, path: "performance" },
    // { key: "transfer", label: "Transfer", icon: transferImage, path: "transfer" },
    { key: "final-result", label: "Final Result", icon: resultImage, path: "final-result" },
];

const staffCards = [
    { key: "registration", label: "Staff registry", icon: enrollmentImage, path: "enrollments" },
    { key: "attendance", label: "Attendance", icon: attendanceImage, path: "attendance" },
    { key: "tranfer", label: "Transfer", icon: transferImage, path: "transfer" },
    // { key: "", label: "Re-enroll", icon: resultImage, path: "re-enroll" },
];

const dashboardData = [
    { key: 0, title: "Student", cards: studentCards },
    // { key: 1, title: "Staff", cards: staffCards }
]

export { staffCards, studentCards, dashboardData }