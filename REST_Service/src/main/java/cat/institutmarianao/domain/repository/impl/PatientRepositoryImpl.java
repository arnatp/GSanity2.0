package cat.institutmarianao.domain.repository.impl;

import java.util.List;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;

import cat.institutmarianao.domain.Patient;
import cat.institutmarianao.domain.repository.PatientRepository;

@Stateless
public class PatientRepositoryImpl implements PatientRepository {

	@PersistenceContext
	private EntityManager entityManager;

	@SuppressWarnings("unchecked")
	@Override
	public List<Patient> getAll() {
		return entityManager.createNamedQuery("Patient.findAll").getResultList();
	}

	@Override
	public void add(Patient patient) {
		entityManager.persist(patient);
	}

	@Override
	public void update(Patient patient) {
		entityManager.merge(patient);
	}

	@Override
	public void delete(Patient patient) {
		Patient patient1 = entityManager.merge(patient);
		entityManager.remove(patient1);
	}

	@Override
	public Patient getUserByDni(String dni) {
		try {
			return (Patient) entityManager.createNamedQuery("Patient.findByDni").setParameter("dni", dni)
					.getSingleResult();
		} catch (NoResultException e) {
			return null;
		}
	}

	@Override
	public Patient getUserByMediCard(String mediCard) {
		try {
			return (Patient) entityManager.createNamedQuery("Patient.findByMediCard").setParameter("mediCard", mediCard)
					.getSingleResult();
		} catch (NoResultException e) {
			return null;
		}
	}

}