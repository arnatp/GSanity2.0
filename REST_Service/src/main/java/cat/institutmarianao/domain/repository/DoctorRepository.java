package cat.institutmarianao.domain.repository;

import java.util.List;

import javax.ejb.Local;

import cat.institutmarianao.domain.Doctor;

@Local
public interface DoctorRepository {

	List<Doctor> getAll();

	void add(Doctor doctor);

	void update(Doctor doctor);

	void delete(Doctor doctor);

	Doctor getUserByDni(String dni);

	Doctor getUserByMediCard(String mediCard);

}
