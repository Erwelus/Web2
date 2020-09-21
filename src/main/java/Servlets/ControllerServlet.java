package Servlets;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

public class ControllerServlet extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        getServletContext().getRequestDispatcher("/index.jsp").forward(req,resp);
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        try {
            if (tryParseToDouble(req.getParameter("X")) &&
                    tryParseToDouble(req.getParameter("Y")) &&
                    tryParseToDouble(req.getParameter("R"))) {
                getServletContext().getRequestDispatcher("/areaCheckServlet").forward(req, resp);
                //
            } else {
                getServletContext().getRequestDispatcher("/index.jsp").forward(req, resp);
            }
        }catch (Exception ex){
            PrintWriter writer = resp.getWriter();
            writer.write("Something went wrong: "+ex.toString());
            writer.close();
        }
    }

    private boolean tryParseToDouble(String s){
        try {
            Double.parseDouble(s);
            return true;
        }catch (NumberFormatException | NullPointerException ex){
            return false;
        }
    }
}
