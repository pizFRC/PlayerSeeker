<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>

<nav class="navbar fixed-top navbar-expand-lg navbar-light shadow-lg p-3 mb-5 bg-body">
  <div class="container-fluid">
    <c:if test="${user == null || user.userType == 'player'}">
    	<a class="navbar-brand" href="/">
    		<img width="150" height="50" src="img/logo.png"/>
   		</a>
    </c:if>
    <c:if test="${user != null && user.userType == 'sport_facility'}">
    	<a class="navbar-brand" href="#">
    		<img width="150" height="50" src="img/logo.png"/>
   		</a>
    </c:if>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
    <c:if test="${user == null || user.userType == 'player'}">
        <li class="nav-item">
          	<a class="nav-link active" aria-current="page" href="/">Home</a>
        </li>
        <li class="nav-item">
          	<a class="nav-link" href="/eventi">Eventi</a>
       	 </li>
        <li class="nav-item">
          	<a class="nav-link" href="/strutture">Strutture</a>
        </li>
     </c:if>
     </ul>
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
</nav>