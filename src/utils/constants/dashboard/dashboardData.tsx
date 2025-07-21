import resultImage from "../../../assets/images/home/result.png";
import transferImage from "../../../assets/images/home/transfer.png";
import enrollmentImage from "../../../assets/images/home/enrollment.png";
import attendanceImage from "../../../assets/images/home/attendance.png";
import performanceImage from "../../../assets/images/home/performance.png";

const studentCards = [
    { key: "registration", label: "Enrollment", icon: enrollmentImage, path: "enrollments", configurable: true },
    { key: "attendance", label: "Attendance", icon: attendanceImage, path: "attendance", configurable: true },
    { key: "performance", label: "Performance", icon: performanceImage, path: "performance", configurable: true },
    { key: "transfer", label: "Transfer", icon: transferImage, path: "transfer", configurable: true },
    { key: "final-result", label: "Final Result", icon: resultImage, path: "final-result", configurable: true },
];

const staffCards = [
    { key: "registration", label: "Staff registry", icon: enrollmentImage, path: "enrollments", configurable: true },
    { key: "attendance", label: "Attendance", icon: attendanceImage, path: "attendance", configurable: true },
    { key: "transfer", label: "Transfer", icon: transferImage, path: "transfer", configurable: true },
    { key: "reenroll", label: "Re-enroll", icon: resultImage, path: "re-enroll", configurable: false },
];

const dashboardData = [
    { key: 0, title: "Student", cards: studentCards },
    { key: 1, title: "Staff", cards: staffCards }
]

export { staffCards, studentCards, dashboardData }