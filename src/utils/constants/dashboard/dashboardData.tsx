import enrollment from "../../../assets/images/home/enrollment.png";
import attendance from "../../../assets/images/home/attendance.png";
import performance from "../../../assets/images/home/performance.png";
import transfer from "../../../assets/images/home/transfer.png";
import result from "../../../assets/images/home/result.png";
import { type DashboardCardProps } from "../../../types/dashboard/CardTypes";

function cardsData(): DashboardCardProps[] {
  return [
    {
      title: "Students",
      subItem: [
        {
          icon: enrollment,
          title: "Enrollment",
          program: "programId",
          timeLabel: "2 hours ago",
          configRoute: "/students/enrollment",
          status: "updated"
        },
        {
          icon: attendance,
          title: "Attendance",
          program: "programId",
          timeLabel: "2 hours ago",
          configRoute: "/students/attendance",
          status: "updated"
        },
        {
          icon: performance,
          title: "Performance",
          program: "programId",
          timeLabel: "2 hours ago",
          configRoute: "/students/performance",
          status: "estable"
        },
        {
          icon: result,
          title: "Final result",
          program: "programId",
          timeLabel: "2 hours ago",
          configRoute: "/students/enrollment",
          status: "estable"
        },
        {
          icon: transfer,
          title: "Transfer",
          program: "programId",
          timeLabel: "2 hours ago",
          configRoute: "/students/enrollment",
          status: "unstable"
        }
      ]
    },
    {
      title: "Staff",
      subItem: [
        {
          icon: enrollment,
          title: "Teacher registry",
          program: "programId",
          timeLabel: "2 hours ago",
          configRoute: "/staff/enrollment",
          status: "unstable"
        },
        {
          icon: enrollment,
          title: "Non-teacher registry",
          program: "programId",
          timeLabel: "2 hours ago",
          configRoute: "/staff/enrollment",
          status: "updated"
        },
        {
          icon: attendance,
          title: "Attendance",
          program: "programId",
          timeLabel: "2 hours ago",
          configRoute: "/staff/attendance",
          status: "unstable"
        },
        {
          icon: transfer,
          title: "Transfer",
          program: "programId",
          timeLabel: "2 hours ago",
          configRoute: "/staff/enrollment",
          status: "estable"
        }
      ]
    }
  ];
}

export { cardsData };
