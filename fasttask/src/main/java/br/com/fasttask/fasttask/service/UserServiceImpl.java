package br.com.fasttask.fasttask.service;

import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.fasttask.fasttask.exception.*;
import br.com.fasttask.fasttask.model.User;
import br.com.fasttask.fasttask.repository.IUserRepository;

@Service
public class UserServiceImpl implements IUserService {

	private final IUserRepository userRepository;
	
	@Autowired
	public UserServiceImpl(IUserRepository userRepository) {
		this.userRepository = userRepository;
	}
	
	@Override
	public User createNewUser(User user) throws InvalidRequestException, EmailAlreadyExistsException {	
			
        if (user.getEmail() == null || user.getPassword() == null) {
            throw new InvalidRequestException("Email e senha são obrigatórios!");
        }
        
        if (userRepository.findByEmail(user.getEmail()) != null) {
        	throw new EmailAlreadyExistsException("E-mail já cadastrado!");
        }
        
        user.setPassword(BCrypt.hashpw(user.getPassword(), BCrypt.gensalt()));
        return userRepository.save(user);       
            
	}
	
	@Override
	public User updateUser(User user)  throws InvalidRequestException, UserNotFoundException, EmailAlreadyExistsException {
		
		if (user.getId() == null) {
	        throw new InvalidRequestException("Id do usuário é obrigatório para atualização!");
	    }

	    User persistedUser = findUserById(user.getId());
	    if (persistedUser == null) {
	        throw new UserNotFoundException("Usuário não encontrado!");
	    }

	    // Verificar se o email foi alterado e se já existe outro usuário com o mesmo email
	    if (!persistedUser.getEmail().equals(user.getEmail()) && userRepository.findByEmail(user.getEmail()) != null) {
	        throw new EmailAlreadyExistsException("E-mail já cadastrado para outro usuário!");
	    }

	    // Se a senha foi alterada, criptografar a nova senha
	    if (!BCrypt.checkpw(user.getPassword(), persistedUser.getPassword())) {
	        user.setPassword(BCrypt.hashpw(user.getPassword(), BCrypt.gensalt()));
	    }

		return userRepository.update(user);
	}
	
	@Override
	public void deleteUser(User user) throws InvalidRequestException, UserNotFoundException {
		
		if (user.getId() == null) throw new InvalidRequestException("Id do usuário é obrigatório para exclusão!");
		
		User currentUser = findUserById(user.getId());
		if (currentUser == null) throw new UserNotFoundException("Usuário não encontrado!");
		
		userRepository.delete(currentUser);
	}
	
	@Override
    public User findUserById(Integer userId) throws UserNotFoundException {
		
		User user = userRepository.findById(userId);
		
		if (user == null) throw new UserNotFoundException("Usuário não encontrado!");
		
		return user;
	}
	
	@Override
	public User findUserByEmail(String email) throws UserNotFoundException {
		
		User user = userRepository.findByEmail(email);
		
		if (user == null) throw new UserNotFoundException("Usuário não encontrado!");
		
		return user;
	}
	
	@Override
	public User authenticateUser(String email, String password) throws InvalidRequestException, UserNotFoundException {
		
		User user = findUserByEmail(email);
		if (user == null) {
			throw new UserNotFoundException("Usuário não encontrado!");
		} 
		
		if (!BCrypt.checkpw(password, user.getPassword())) {
			throw new InvalidRequestException("Senha Inválida!");
		}
		
		return user;
	}
}
