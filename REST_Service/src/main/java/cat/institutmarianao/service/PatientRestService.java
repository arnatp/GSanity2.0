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

import cat.institutmarianao.domain.Patient;
import cat.institutmarianao.domain.User;
import cat.institutmarianao.domain.repository.PatientRepository;

@Path("/patients")
@Singleton
public class PatientRestService {
	@Context
	private UriInfo uriInfo;

	@Inject
	private PatientRepository patientRepository;

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public List<Patient> getAll() {
		return patientRepository.getAll();
	}

	@GET
	@Path("findByDni/{dni}")
	@Produces(MediaType.APPLICATION_JSON)
	public User findByDni(@PathParam("dni") String dni) {
		return patientRepository.getUserByDni(dni);
	}

	@GET
	@Path("findByMediCard/{mediCard}")
	@Produces(MediaType.APPLICATION_JSON)
	public User findByMediCard(@PathParam("mediCard") String mediCard) {
		return patientRepository.getUserByMediCard(mediCard);
	}

	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	public Response create(Patient patient) {
		if (patient == null) {
			throw new BadRequestException();
		}
		patientRepository.add(patient);

		URI doctorUri = uriInfo.getAbsolutePathBuilder().path(patient.getDni()).build();
		return Response.ok(doctorUri).build();
	}

	@PUT
	@Consumes(MediaType.APPLICATION_JSON)
	public void edit(Patient patient) {
		patientRepository.update(patient);
	}

	@DELETE
	@Path("deleteByDni/{dni}")
	public void remove(@PathParam("dni") String dni) {
		patientRepository.delete(patientRepository.getUserByDni(dni));
	}
}
