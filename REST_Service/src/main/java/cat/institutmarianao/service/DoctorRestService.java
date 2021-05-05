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

import cat.institutmarianao.domain.Doctor;
import cat.institutmarianao.domain.User;
import cat.institutmarianao.domain.repository.DoctorRepository;

@Path("/doctors")
@Singleton
public class DoctorRestService {
	@Context
	private UriInfo uriInfo;

	@Inject
	private DoctorRepository doctorRepository;

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public List<Doctor> getAll() {
		return doctorRepository.getAll();
	}

	@GET
	@Path("findByDni/{dni}")
	@Produces(MediaType.APPLICATION_JSON)
	public User findByDni(@PathParam("dni") String dni) {
		return doctorRepository.getUserByDni(dni);
	}

	@GET
	@Path("findByMediCard/{mediCard}")
	@Produces(MediaType.APPLICATION_JSON)
	public User findByMediCard(@PathParam("mediCard") String mediCard) {
		return doctorRepository.getUserByMediCard(mediCard);
	}

	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	public Response create(Doctor doctor) {
		if (doctor == null) {
			throw new BadRequestException();
		}
		doctorRepository.add(doctor);

		URI doctorUri = uriInfo.getAbsolutePathBuilder().path(doctor.getDni()).build();
		return Response.ok(doctorUri).build();
	}

	@PUT
	@Consumes(MediaType.APPLICATION_JSON)
	public void edit(Doctor doctor) {
		doctorRepository.update(doctor);
	}

	@DELETE
	@Path("deleteByDni/{dni}")
	public void remove(@PathParam("dni") String dni) {
		doctorRepository.delete(doctorRepository.getUserByDni(dni));
	}
}
