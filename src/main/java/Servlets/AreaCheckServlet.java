package Servlets;

import Modules.Entry;
import Modules.EntryList;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.io.PrintWriter;


public class AreaCheckServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        HttpSession session = request.getSession();

        Double x = Double.parseDouble(request.getParameter("X"));
        String[] y_vals = request.getParameterValues("Y");
        double r = 0.0;
        String[] r_vals = request.getParameterValues("R");
        for (String s: r_vals) {
            if(Double.parseDouble(s) > r) r = Double.parseDouble(s);
        }

        String answer="";
        response.setContentType("text/html; charset=UTF-8");
        for (String y_val : y_vals) {
            Double y = Double.parseDouble(y_val);
            if (checkRange(x, y, r)) {
                Entry entry = new Entry();
                entry.setX(x);
                entry.setY(y);
                entry.setR(r);
                entry.setResult(checkArea(x, y, r));

                EntryList entryList = (EntryList) session.getAttribute("EntryList");
                if (entryList == null) {
                    entryList = new EntryList();
                }
                entryList.addEntry(entry);
                session.setAttribute("EntryList", entryList);

                answer = prepareResponse(entry);
            } else answer = prepareError("Do not change the request, please");
        }
        PrintWriter writer = response.getWriter();
        writer.write(answer);
        writer.close();
    }

    private boolean checkRange(Double x, Double y, Double r){
        return ((x>=-5) && (x<=3) &&
                (y>=-2) && (y<=2) &&
                (r>=1) && (r<=5));
    }

    private boolean checkArea(Double x, Double y, Double r){
        if ((x>=0) && (y>=0) && (y<= r/2 - x)){
            return true;
        }else if((x>=0) && (y<=0) && (x*x + y*y <= r*r)){
            return true;
        }else return ((x<=0) && (y>=0) && (x>=-r) && (y<=r/2));
    }

    private String prepareResponse(Entry entry){
        return "<!DOCTYPE html>\n"+
        "<html>\n"+
                "<head>\n"+
                "        <meta charset=\"UTF-8\">\n"+
                "       <title>test</title>\n"+
                "       <link rel=\"stylesheet\" type=\"text/css\" href=\"css/return.css\">\n"+
                "   </head>\n"+
                "   <body>\n"+
                "       <div id=\"body_div\">\n"+
                "           <div id = \"head_div\" class=\"head\">\n"+
                "               <span>Любкин Андрей Сергеевич, P3214</span>\n"+
                "               <span>Вариант 2527</span>\n"+
                "           </div>\n"+
                "           <div id=\"table_div\">\n"+
                "           <table class=\"result\">\n"+
                "               <thead>\n"+
                "                   <tr>\n"+
                "                      <td>X</td>\n"+
                "                      <td>Y</td>\n"+
                "                      <td>R</td>\n"+
                "                      <td>Result</td>\n"+
                "                   </tr>\n"+
                "               </thead>\n"+
                "               <tbody id=\"#table_body\">\n"+
                "                   <tr>\n"+
                "                   <td><div class='cell'>"+entry.getX()+"</div></td>\n"+
                "                   <td><div class='cell'>"+entry.getY()+"</div></td>\n"+
                "                   <td><div class='cell'>"+entry.getR()+"</div></td>\n"+
                "                   <td><div class='cell'>"+entry.isResult()+"</div></td>\n"+
                "                   </tr>\n"+
                "               </tbody>\n"+
                "           </table>\n"+
                "           </div>\n"+
                "           <form> <button id=\"submit_button\" type=\"submit\">Return</button></form>\n"+
                "       </div>\n"+
                "   </body>\n"+
                "</html>";
    }
    public String prepareError(String type) {
        return  "<!DOCTYPE html>\n"+
                "<html>\n"+
                "<head>\n"+
                "        <meta charset=\"utf-8\">\n"+
                "       <title>test</title>\n"+
                "       <link rel=\"stylesheet\" type=\"text/css\" href=\"css/return.css\">\n"+
                "   </head>\n"+
                "   <body>\n"+
                "       <div id=\"body_div\">\n"+
                "           <div id=\"head_div\" class=\"head\">\n"+
                "              <span id=\"error\"> INDEX OUT OF RANGE: " + type +"</span>"+
                "           </div>\n"+
                "           <form> <button id=\"submit_button\" type=\"submit\">Return</button></form>\n"+
                "       </div>\n"+
                "   </body>\n"+
                "</html>";


    }
}
