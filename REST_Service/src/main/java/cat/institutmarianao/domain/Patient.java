package cat.institutmarianao.domain;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "patient")
@NamedQueries({ @NamedQuery(name = "Patient.findAll", query = "select u from Patient u"),
		@NamedQuery(name = "Patient.findByDni", query = "select u from Patient u where u.dni = :dni"),
		@NamedQuery(name = "Patient.findByMediCard", query = "select u from Patient u where u.mediCard = :mediCard") })
public class Patient extends User implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@NotNull
	@Column(name = "height", nullable = false)
	private float height;

	@NotNull
	@Column(name = "weigth", nullable = false)
	private float weigth;

	public Patient() {
		// Constructor vacio para poder crear las tablas en JPA
	}

	public float getHeight() {
		return height;
	}

	public void setHeight(float height) {
		this.height = height;
	}

	public float getWeigth() {
		return weigth;
	}

	public void setWeigth(float weigth) {
		this.weigth = weigth;
	}
}
