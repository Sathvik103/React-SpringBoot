// dao/StudentDAO.java
package dao;
import db.DBConnection;
import models.Student;
import java.sql.*;

public class StudentDAO {

    public Student login(String email, String password) {
        try (Connection conn = DBConnection.getConnection()) {
            PreparedStatement ps = conn.prepareStatement(
                "SELECT * FROM students WHERE email=? AND password=?");
            ps.setString(1, email);
            ps.setString(2, password);
            ResultSet rs = ps.executeQuery();

            if (rs.next()) {
                return new Student(rs.getInt("student_id"), rs.getString("name"),
                                   rs.getString("email"), rs.getString("password"));
            }
        } catch (SQLException e) { e.printStackTrace(); }
        return null;
    }

    public void register(String name, String email, String password) {
        try (Connection conn = DBConnection.getConnection()) {
            PreparedStatement ps = conn.prepareStatement(
                "INSERT INTO students(name,email,password) VALUES (?,?,?)");
            ps.setString(1, name);
            ps.setString(2, email);
            ps.setString(3, password);
            ps.executeUpdate();
            System.out.println("✅ Student registered successfully!");
        } catch (SQLException e) { e.printStackTrace(); }
    }
}