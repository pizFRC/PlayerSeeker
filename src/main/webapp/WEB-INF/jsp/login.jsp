<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>

<html lang="it">
<head>
	<jsp:include page="head.jsp"/>
	<meta name="google-signin-client_id" content="345576690488-5jgneq5npfclnad4b92mvflcuhsundgs.apps.googleusercontent.com">  
	<!-- Google login -->
	<script src="https://apis.google.com/js/platform.js" async defer></script>
	<title>Player Seeker - Login</title>	
</head>

<body id="login_body">
	<!-- HEADER --->
	<jsp:include page="header.jsp" />
	
	<div id = "login" class="position-absolute top-50 start-50 translate-middle shadow-lg p-5 m-5 bg-body rounded">
		<c:if test="${errorMessage != null}">
			<div class="alert alert-danger d-flex align-items-center" role="alert">
				<i class="bi bi-exclamation-triangle-fill me-2" width="24" height="24" role="img" aria-label="Danger:"> <use xlink:href="#exclamation-triangle-fill" /></i>
				<div>${errorMessage}</div>
			</div>
        </c:if>
		
		<div id="divUPC">
			<div class="row justify-content-md-center">
				<div class="col-sm-auto">
					<img class="m-3" rel="icon" width="200" height="65"
						src="img/logo.png" type="image/x-icon" />
				</div>
			</div>
		
		<form method="post" id="form_login" action="checkUser">
			<div>
				
				<div class="row justify-content-md-center">
					<div class="col-sm-12">
						<label for="validationDefaultUsername" class="form-label">Username</label>
						<div class="input-group">
							<span class="input-group-text" id="inputGroupPrepend2">@</span> <input
								type="text" class="form-control" id="validationDefaultUsername"
								aria-describedby="inputGroupPrepend2"
								name="validationDefaultUsername" required>
						</div>
					</div>
				</div>
				<div class="row justify-content-md-center">
					<div class="col-sm-12">
						<label for="inputPassword" class="col-sm-2 col-form-label">Password</label>
						<input type="password" class="form-control" id="inputPassword"
							aria-describedby="inputGroupPrepend2" required>
					</div>
				</div>
				<div id="btn_accedi" class="row justify-content-md-center">
					<div class="col-sm-auto">
						<button type="submit" class="btn btn-primary m-4">Accedi</button>
					</div>
					<div class="row justify-content-md-center">
						<div class="col-sm-auto">
							<a id="btn_registrati" onclick="hideBtn()" class="link-primary">Non
								hai ancora un account? Registrati!</a>
						</div>
					</div>
				</div>
			</div>

		</form>
		</div>
		
		<div class="row align-items-center m-4" id="google_signIn_button">
			<hr class="col-sm-4">
			<p class="col-sm-4 open_sans_font" align="center"> oppure </p>
			<hr class="col-sm-4">
		</div>
     
          <h2 class="fs-5 fw-bold mb-3" style="text-align:center;">Puoi anche accedere con</h2>
          <div class="g-signin2 row justify-content-md-center" data-onsuccess="onSignIn"></div>
	</div>
	
	<!-- FOOTER -->
	<jsp:include page="footer.jsp"/>
	
	<!-- CDN -->
	<script
		src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
		integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p"
		crossorigin="anonymous"></script>

	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
	
	<script type="text/javascript"  src="../js/registrazione.js"> </script>
	<script type="text/javascript"  src="../js/login.js"> </script>
</body>
</html>


