<%-- 
    Document   : index
    Created on : May 5, 2014, 8:04:48 AM
    Author     : jeremy.wermeill
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Accueil Chiffrement ADFGVX</title>
    </head>
    <body>
        <h1>-- Bienvenue --</h1>

        <form method="POST" action="MainController">
            <table>
                <tr>
                    <td>Text :</td>
                    <td><input type="text" name="text" /></td>
                    <td>Clé :</td>
                    <td><input type="text" name="cle"/></td>
                <input type="hidden" name="action" value="add"/>
                </tr>
            </table>
            <input type="submit" value="encoder"/>
        </form>
        <% if (request.getAttribute("encoded") != null) {%>
        <h1><%=request.getAttribute("encoded")%></h1>
        <%}%>
        <br/><br/>
          <% char[][] tableau = (char[][])request.getAttribute("tableau");%>
       <%! private static final char[] morse = {'A', 'D', 'F', 'G', 'V', 'X'};%>
       <% if(tableau!=null){  
                out.println();
                out.println("TABLEAU DE SUBSTITUTION");%><br><%
		out.println("    ");
		// the letters A D F G V X
		for(int i = 0; i < morse.length; i++)
		out.println(" " + morse[i]);
		out.println();
		// +---------- under the A D F G V X at the top
		System.out.print("  +--");%><br><%
		for(int i = 0; i < morse.length; i++)
		out.println("--");
		out.println();%><br><%
		// now the different row
		for(int i = 0; i < morse.length; i++) {
			// the letter at the beginning of the row
			out.println(morse[i] + " | ");
			// the Grid contents for that line
			for(int j = 0; j < morse.length; j++) {
				out.println(" " + tableau[i][j]);
			}
			out.println();%><br><%
		}
       
       }%>
       <br><br>
        <form method="POST" action="MainController">
            <table>
                <tr>
                    <td>Décoder</td>
                    <td><input type="text" name="decode"</td>
                    <input type="hidden" name="action" value="todecode"/>
                </tr>
            </table>
              <input type="submit" value="Décoder"/>
        </form>
        <br><br>
        <% if (request.getAttribute("msgdecoded") != null) {%>
        <h1><%=request.getAttribute("msgdecoded")%></h1>
        <%}%>
    </body>
</html>
