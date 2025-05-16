package br.com.fasttask.fasttask.repository;

import java.util.List;

import org.springframework.stereotype.Repository;

import br.com.fasttask.fasttask.model.User;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;

@Repository
public class UserRepositoryImpl implements IUserRepository {

	@PersistenceContext
	private EntityManager entityManager;
	
	@Transactional
	@Override
	public User save(User user) {
		entityManager.persist(user);
		return user;
	}

	@Transactional
	@Override
	public User update(User user) {
		return entityManager.merge(user);
	}

	@Transactional
	@Override
	public void delete(User user) {
		entityManager.remove(entityManager.contains(user) ? user : entityManager.merge(user));
	}

	@Override
	public User findById(Integer id) {
		return entityManager.find(User.class, id);
	}
	
	@Override
	public User findByEmail(String email) {
		List<User> user = entityManager.createQuery("SELECT u FROM User u WHERE u.email = :email", User.class).setParameter("email", email).getResultList();
		return user.isEmpty() ? null : user.get(0);
	}
}
