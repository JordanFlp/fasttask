package br.com.fasttask.fasttask.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.fasttask.fasttask.model.Subitem;
import br.com.fasttask.fasttask.repository.ISubitemRepository;

@Service
public class SubitemServiceImpl implements ISubitemService {

    private final ISubitemRepository subitemRepository;

    @Autowired
    public SubitemServiceImpl(ISubitemRepository subitemRepository) {
        this.subitemRepository = subitemRepository;
    }

    @Override
    public Subitem createSubitem(Subitem subitem) {
        return subitemRepository.save(subitem);
    }

   @Override
    public Subitem updateSubitem(Subitem subitem) {
        Subitem existing = subitemRepository.findById(subitem.getId());
        if (existing == null) {
            throw new IllegalArgumentException("Subitem não encontrado: " + subitem.getId());
        }

        // Atualiza apenas os campos permitidos
        existing.setDescription(subitem.getDescription());
        existing.setActive(subitem.getActive());

        return subitemRepository.update(existing); // usa o método update do seu repositório
    }

    @Override
    public void deleteSubitem(Subitem subitem) {
        subitemRepository.delete(subitem);
    }

    @Override
    public Subitem findSubitemById(Integer subitemId) {
        return subitemRepository.findById(subitemId);
    }

    @Override
    public List<Subitem> findAllSubitems() {
        return subitemRepository.findAll();
    }

    @Override
    public List<Subitem> findSubitemsByTaskId(Integer taskId) {
        return subitemRepository.findByTaskId(taskId);
    }
}
