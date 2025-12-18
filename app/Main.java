package app;
import java.util.*;
import dao.StudentDAO;
import dao.CourseDAO;
import dao.RegistrationDAO;
import models.Student;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        StudentDAO sdao = new StudentDAO();
        CourseDAO cdao = new CourseDAO();
        RegistrationDAO rdao = new RegistrationDAO();
        Student current = null;

        while (true) {
            System.out.println("\n=== COURSE REGISTRATION PORTAL ===");
            System.out.println("1. Register Student");
            System.out.println("2. Login");
            System.out.println("3. Exit");
            int choice = sc.nextInt(); sc.nextLine();

            if (choice == 1) {
                System.out.print("Name: "); String name = sc.nextLine();
                System.out.print("Email: "); String email = sc.nextLine();
                System.out.print("Password: "); String pass = sc.nextLine();
                sdao.register(name, email, pass);
            }
            else if (choice == 2) {
                System.out.print("Email: "); String email = sc.nextLine();
                System.out.print("Password: "); String pass = sc.nextLine();
                current = sdao.login(email, pass);
                if (current != null) {
                    System.out.println("Welcome, " + current.getName());
                    while (true) {
                        System.out.println("\n1. View Courses\n2. Register for Course\n3. My Courses\n4. Logout");
                        int ch = sc.nextInt();
                        if (ch == 1) cdao.showAllCourses();
                        else if (ch == 2) {
                            System.out.print("Enter Course ID: ");
                            int cid = sc.nextInt();
                            rdao.registerCourse(current.getId(), cid);
                        }
                        else if (ch == 3) rdao.showRegisteredCourses(current.getId());
                        else break;
                    }
                } else System.out.println("❌ Invalid login!");
            }
            else break;
        }
        sc.close();
    }
}