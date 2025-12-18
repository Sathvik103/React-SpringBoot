// dao/CourseDAO.java
package dao;
import db.DBConnection;
import java.sql.*;

public class CourseDAO {

    public void showAllCourses() {
        try (Connection conn = DBConnection.getConnection()) {
            Statement st = conn.createStatement();
            ResultSet rs = st.executeQuery("SELECT * FROM courses");
            System.out.printf("%-5s %-25s %-15s %-10s %-10s\n",
                              "ID", "Course", "Instructor", "Credits", "Seats");
            while (rs.next()) {
                System.out.printf("%-5d %-25s %-15s %-10d %-10d\n",
                    rs.getInt("course_id"), rs.getString("course_name"),
                    rs.getString("instructor"), rs.getInt("credits"),
                    rs.getInt("max_seats"));
            }
        } catch (SQLException e) { e.printStackTrace(); }
    }
}