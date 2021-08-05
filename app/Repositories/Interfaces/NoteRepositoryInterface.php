<?php

namespace App\Repositories\Interfaces;


interface NoteRepositoryInterface
{
    public function all(array $attributes);

    public function add(array $attributes);

    public function edit($id, array $attributes);
    
    public function delete($id);

    public function show($id , $params );

    //    public function getByUser(User $user);
}
