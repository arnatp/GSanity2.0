package cat.institutmarianao.domain.repository;

import java.util.List;

import javax.ejb.Local;

import cat.institutmarianao.domain.Prescription;

@Local
public interface PrescriptionRepository {

	List<Prescription> getAll();

	void add(Prescription prescription);

	void update(Prescription prescription);

	void delete(Prescription prescription);

	Prescription getPrescriptionByPrescriptionId(int prescriptionId);

}
