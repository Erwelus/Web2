<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" type="text/css" href="css/main.css">
    <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/js-cookie@rc/dist/js.cookie.min.js"></script>
</head>
<body>
<div class="main">
    <table>
    <tr id="head">
        <td>
            Любкин Андрей Сергеевич, P3214, Вариант 2527
        </td>
    </tr>
    <tr id="canvas_row">
        <td>
            <canvas id="canvas" width="450px" height="450px"></canvas>
        </td>
    </tr>
    <tr id="form_row">
        <td>
            <form id="form" action="controllerServlet" method="get">
                <table id="x_table">
                    <tr id="x_row">
                        <td class="letter">X:</td>
                        <td>
                            <input id="x"type="text" name="X" onchange="validate()" oninput="validate()" title="X&isin;(-5; 3)" maxlength="15">
                        </td>
                        <td class="valid_text">
                            Enter correct arguments
                        </td>
                    </tr>
                </table>

                <table id="y_table">
                    <tr id="y_row">
                        <td class="letter">Y:</td>
                        <td>
                            <input type="checkbox" name="Y" id="-2" value="-2">-2
                        </td>
                        <td>
                            <input type="checkbox" name="Y" id="-1.5" value="-1.5">-1.5
                        </td>
                        <td>
                            <input type="checkbox" name="Y" id="-1" value="-1">-1
                        </td>
                        <td>
                            <input type="checkbox" name="Y" id="-0.5" value="-0.5">-0.5
                        </td>
                        <td>
                            <input type="checkbox" name="Y" id="0" value="0">0
                        </td>
                        <td>
                            <input type="checkbox" name="Y" id="0.5" value="0.5">0.5
                        </td>
                        <td>
                            <input type="checkbox" name="Y" id="1" value="1">1
                        </td>
                        <td>
                            <input type="checkbox" name="Y" id="1.5" value="1.5">1.5
                        </td>
                        <td class="lastY">
                            <input type="checkbox" name="Y" id="2" value="2">2
                        </td>
                        <td class="valid_text">
                            to unable
                        </td>
                    </tr>
                </table>

                <table id="r_table">
                    <tr id="r_row">
                        <td class="letter">R:</td>
                        <td>
                            <input type="checkbox" name="R" value="1">1
                        </td>
                        <td>
                            <input type="checkbox" name="R" value="2">2
                        </td>
                        <td>
                            <input type="checkbox" name="R" value="3">3
                        </td>
                        <td>
                            <input type="checkbox" name="R" value="4">4
                        </td>
                        <td>
                            <input type="checkbox" name="R" value="5">5
                        </td>
                        <td class="valid_text">
                            the "Check" button
                        </td>
                    </tr>
                </table>

                <table id="button_table">
                    <tr id="button_row">
                        <td>
                            <button type="submit" id="submit" class="btn btn-dark">Submit</button>
                        </td>
                    </tr>
                </table>
            </form>
        </td>
    </tr>
    <tr id="table_row">
        <table class="result">
            <thead>
                <td>X</td>
                <td>Y</td>
                <td>R</td>
                <td>Result</td>
            </thead>
            <tbody id="table_body">
            <jsp:useBean id="EntryList" scope="session" class="Modules.EntryList"/>
            <c:forEach var="entry"
                       items="${EntryList.entryList}">
                <tr>
                    <td> <div class="cell">${entry.x} </div></td>
                    <td> <div class="cell">${entry.y} </div></td>
                    <td> <div class="cell">${entry.r} </div></td>
                    <td> <div class="cell">${entry.result} </div> </td>
                </tr>
            </c:forEach>
            </tbody>
        </table>
    </tr>
    </table>
</div>
<script type="text/javascript" src="js/draw.js"></script>
<script type="text/javascript" src="js/valid.js"></script>
</body>
</html>