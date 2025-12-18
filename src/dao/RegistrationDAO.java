// dao/RegistrationDAO.java
package dao;
import db.DBConnection;
import java.sql.*;

public class RegistrationDAO {

    public void registerCourse(int studentId, int courseId) {
        try (Connection conn = DBConnection.getConnection()) {
            PreparedStatement ps = conn.prepareStatement(
                "INSERT INTO registrations(student_id, course_id) VALUES (?, ?)");
            ps.setInt(1, studentId);
            ps.setInt(2, courseId);
            ps.executeUpdate();
            System.out.println("✅ Course registered successfully!");
        } catch (SQLException e) {
            System.out.println("⚠ You are already registered or invalid course.");
        }
    }

    public void showRegisteredCourses(int studentId) {
        try (Connection conn = DBConnection.getConnection()) {
            PreparedStatement ps = conn.prepareStatement(
                "SELECT c.course_id, c.course_name FROM courses c JOIN registrations r ON c.course_id=r.course_id WHERE r.student_id=?");
            ps.setInt(1, studentId);
            ResultSet rs = ps.executeQuery();
            System.out.println("Your registered courses:");
            while (rs.next()) {
                System.out.println(rs.getInt("course_id") + " - " + rs.getString("course_name"));
            }
        } catch (SQLException e) { e.printStackTrace(); }
    }
}