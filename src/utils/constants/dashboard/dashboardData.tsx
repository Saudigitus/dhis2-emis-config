import resultImage from "../../../assets/images/home/result.png";
import transferImage from "../../../assets/images/home/transfer.png";
import enrollmentImage from "../../../assets/images/home/enrollment.png";
import attendanceImage from "../../../assets/images/home/attendance.png";
import performanceImage from "../../../assets/images/home/performance.png";
import studentProfileImage from "../../../assets/images/home/student-profile.png";
import workerImage from "../../../assets/images/home/worker.png";

import { D2I18n } from 'dhis2-semis-types';

const studentCards = (i18n: D2I18n) => [
    { key: "registration", label: i18n.t("Enrollment"), icon: enrollmentImage, path: "enrollments", configurable: true },
    { key: "attendance", label: i18n.t("Attendance"), icon: attendanceImage, path: "attendance", configurable: true },
    { key: "performance", label: i18n.t("Performance"), icon: performanceImage, path: "performance", configurable: true },
    { key: "transfer", label: i18n.t("Transfer"), icon: transferImage, path: "transfer", configurable: true },
    { key: "final-result", label: i18n.t("Final Result"), icon: resultImage, path: "final-result", configurable: true },
    { key: "profile", hasNavigation: true, route: "profile?sectionType=student", label: i18n.t("Student Profile"), icon: studentProfileImage, path: "profile", configurable: true },
];

const staffCards = (i18n: D2I18n) => [
    { key: "registration", label: i18n.t("Staff registry"), icon: enrollmentImage, path: "enrollments", configurable: true },
    { key: "attendance", label: i18n.t("Attendance"), icon: attendanceImage, path: "attendance", configurable: true },
    { key: "transfer", label: i18n.t("Transfer"), icon: transferImage, path: "transfer", configurable: true },
    { key: "final-result", label: i18n.t("Re-enroll"), icon: resultImage, path: "final-result", configurable: true },
    { key: "profile", hasNavigation: true, route: "profile/sectionType=staff", label: i18n.t("Staff Profile"), icon: workerImage, path: "profile", configurable: true },
];

const dashboardData = (i18n: D2I18n) => [
    { key: 0, title: "Student", cards: studentCards(i18n) },
    { key: 1, title: "Staff", cards: staffCards(i18n) }
]

export { staffCards, studentCards, dashboardData }