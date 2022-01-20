<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>

<header class="shadow p-3 mb-5 bg-body rounded fixed-top navbar-light bg-light text-center">
	<div class="d-flex justify-content-between row">
		<a href="/"
			class="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none">
			<img rel="icon" width="150" height="50" src="img/logo.png"
			type="image/x-icon" />
		</a>

		<ul class="nav col-sm-12 col-md-7 mb-2 justify-content-center mb-md-0"
			id="menu_items">
			<li class="raleway_font"><a href="/"
				class="nav-link px-2 link-secondary ">Home</a></li>
			<li><a href="/eventi" class="nav-link px-2 link-dark">Eventi</a></li>
			<li><a href="/strutture" class="nav-link px-2 link-dark">Strutture</a></li>
			<li><a href="#" class="nav-link px-2 link-dark">Contattaci</a></li>
		</ul>
		<div class="col-md-2 text-end  " id="login_div">
		<c:if test="${user == null}">
			<a type="button" class="btn btn-outline-primary me-2" href="login">Accedi</a>
		</c:if>
		<c:if test="${user != null}">
			<c:if test="${user.userType == 'player'}">
				<a type="button" class="btn btn-outline-primary me-2" href="accountManagementPlayer"> <i class="bi bi-person me-2"></i> ${ profile.name }</a>
			</c:if>
			<c:if test="${user.userType == 'sport_facility'}">
				<a type="button" class="btn btn-outline-primary me-2" href="accountManagementSportFacility"> <i class="bi bi-person me-2"></i> ${ profile.name }</a>
			</c:if>
		</c:if>
		</div>
	</div>
</header>