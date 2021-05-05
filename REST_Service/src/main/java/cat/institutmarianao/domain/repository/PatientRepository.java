package cat.institutmarianao.domain.repository;

import java.util.List;

import javax.ejb.Local;

import cat.institutmarianao.domain.Patient;

@Local
public interface PatientRepository {

	List<Patient> getAll();

	void add(Patient patient);

	void update(Patient patient);

	void delete(Patient patient);

	Patient getUserByDni(String dni);

	Patient getUserByMediCard(String mediCard);

}
