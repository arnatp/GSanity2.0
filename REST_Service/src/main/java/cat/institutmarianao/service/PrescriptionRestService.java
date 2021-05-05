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

import cat.institutmarianao.domain.Prescription;
import cat.institutmarianao.domain.repository.PrescriptionRepository;

@Path("/prescriptions")
@Singleton
public class PrescriptionRestService {
	@Context
	private UriInfo uriInfo;

	@Inject
	private PrescriptionRepository prescriptionRepository;

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public List<Prescription> getAll() {
		return prescriptionRepository.getAll();
	}

	@GET
	@Path("findByPrescriptionId/{prescriptionId}")
	@Produces(MediaType.APPLICATION_JSON)
	public Prescription findByPrescriptionId(@PathParam("prescriptionId") int prescriptionId) {
		return prescriptionRepository.getPrescriptionByPrescriptionId(prescriptionId);
	}

	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	public Response create(Prescription prescription) {
		if (prescription == null) {
			throw new BadRequestException();
		}
		prescriptionRepository.add(prescription);

		URI doctorUri = uriInfo.getAbsolutePathBuilder().path(String.valueOf(prescription.getPrescriptionId())).build();
		return Response.ok(doctorUri).build();
	}

	@PUT
	@Consumes(MediaType.APPLICATION_JSON)
	public void edit(Prescription prescription) {
		prescriptionRepository.update(prescription);
	}

	@DELETE
	@Path("deleteByPrescriptionId/{prescriptionId}")
	public void remove(@PathParam("prescriptionId") int prescriptionId) {
		prescriptionRepository.delete(prescriptionRepository.getPrescriptionByPrescriptionId(prescriptionId));
	}
}
