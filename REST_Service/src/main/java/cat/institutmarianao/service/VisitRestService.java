package cat.institutmarianao.service;

import java.net.URI;
import java.util.List;

import javax.ejb.Singleton;
import javax.inject.Inject;
import javax.ws.rs.BadRequestException;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriInfo;

import cat.institutmarianao.domain.Visit;
import cat.institutmarianao.domain.repository.VisitRepository;

@Path("/visits")
@Singleton
public class VisitRestService {
	@Context
	private UriInfo uriInfo;

	@Inject
	private VisitRepository visitRepository;

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public List<Visit> getAll() {
		return visitRepository.getAll();
	}

	@GET
	@Path("findByVisitId/{visitId}")
	@Produces(MediaType.APPLICATION_JSON)
	public Visit findByVisitId(@PathParam("visitId") int visitId) {
		return visitRepository.getVisitByVisitId(visitId);
	}

	@GET
	@Path("findByDate/{date}")
	@Produces(MediaType.APPLICATION_JSON)
	public List<Visit> findByDate(@PathParam("date") String date) {
		return visitRepository.getVisitsByDate(date);
	}

	@GET
	@Path("findByDoctorId/{doctorId}")
	@Produces(MediaType.APPLICATION_JSON)
	public List<Visit> findByDoctorId(@PathParam("doctorId") int doctorId) {
		return visitRepository.getVisitsByDoctorId(doctorId);
	}

	@GET
	@Path("findByPatientId/{patientId}")
	@Produces(MediaType.APPLICATION_JSON)
	public List<Visit> findByPatientId(@PathParam("patientId") int patientId) {
		return visitRepository.getVisitsByPatientId(patientId);
	}

	@GET
	@Path("findByPatientIdCompleted/{patientId}")
	@Produces(MediaType.APPLICATION_JSON)
	public List<Visit> findByPatientIdCompleted(@PathParam("patientId") int patientId) {
		return visitRepository.getVisitsCompletedByPatientId(patientId);
	}

	@GET
	@Path("findByPatientIdIncompleted/{patientId}")
	@Produces(MediaType.APPLICATION_JSON)
	public List<Visit> findByPatientIdIncompleted(@PathParam("patientId") int patientId) {
		return visitRepository.getVisitsIncompletedByPatientId(patientId);
	}

	@GET
	@Path("findByDoctorId/{doctorId}/date/{date}")
	@Produces(MediaType.APPLICATION_JSON)
	public List<Visit> findByDoctorIdAndDate(@PathParam("doctorId") int doctorId, @PathParam("date") String date) {
		return visitRepository.getVisitsByDoctorIdAndDate(doctorId, date);
	}

	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	public Response create(Visit visit) {
		if (visit == null) {
			throw new BadRequestException();
		}
		visitRepository.add(visit);

		URI doctorUri = uriInfo.getAbsolutePathBuilder().path(String.valueOf(visit.getVisitId())).build();
		return Response.ok(doctorUri).build();
	}

	@PUT
	@Consumes(MediaType.APPLICATION_JSON)
	public void edit(Visit visit) {
		visitRepository.update(visit);
	}

	@DELETE
	@Path("deleteById/{visitId}")
	public void remove(@PathParam("visitId") int visitId) {
		visitRepository.delete(visitRepository.getVisitByVisitId(visitId));
	}

	@GET
	@Path("findByDoctorIdIncompleted/{doctorId}/date/{date}")
	@Produces(MediaType.APPLICATION_JSON)
	public List<Visit> findByDoctorIdAndDateIncompleted(@PathParam("doctorId") int doctorId,
			@PathParam("date") String date) {
		return visitRepository.getIncompletedVisitsByDoctorIdAndDate(doctorId, date);
	}
}
