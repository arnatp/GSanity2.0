package cat.institutmarianao.domain.repository.impl;

import java.util.List;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;

import cat.institutmarianao.domain.Prescription;
import cat.institutmarianao.domain.repository.PrescriptionRepository;

@Stateless
public class PrescriptionRepositoryImpl implements PrescriptionRepository {

	@PersistenceContext
	private EntityManager entityManager;

	@SuppressWarnings("unchecked")
	@Override
	public List<Prescription> getAll() {
		return entityManager.createNamedQuery("Prescription.findAll").getResultList();
	}

	@Override
	public void add(Prescription prescription) {
		entityManager.persist(prescription);

	}

	@Override
	public void update(Prescription prescription) {
		entityManager.merge(prescription);

	}

	@Override
	public void delete(Prescription prescription) {
		Prescription prescription1 = entityManager.merge(prescription);
		entityManager.remove(prescription1);

	}

	@Override
	public Prescription getPrescriptionByPrescriptionId(int prescriptionId) {
		try {
			return (Prescription) entityManager.createNamedQuery("Prescription.findByPrescriptionId")
					.setParameter("prescriptionId", prescriptionId).getSingleResult();
		} catch (NoResultException e) {
			return null;
		}
	}

}