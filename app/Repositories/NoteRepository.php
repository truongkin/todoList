<?php

namespace App\Repositories;


use App\Models\NoteModel;
use App\Repositories\Interfaces\NoteRepositoryInterface;


class NoteRepository implements NoteRepositoryInterface
{
    public function all($param)
    {
        return NoteModel::filter($param)->paginate($param['limit']);
        // return NoteModel::filter($param)->latest()->paginate($param['limit']);
    }
    public function add($data)
    {
        return NoteModel::create($data);
    }
    public function edit($id, $data)
    {
        $note = NoteModel::find($id);
        return $note->update($data);
    }
    public function delete($id)
    {
        return NoteModel::destroy($id);
    }
    public function show($key, $param)
    {
        if ($key == "getNoteNotPaging")
            return NoteModel::filter($param)->get();
    }
}
