export const commands = {
    python: function(code :string){
        const runCommand=`echo '${code}' > test.py && python test.py`;
        return ['bin/bash','-c',runCommand];
    },
    cpp: function(code :string){
        const runCommand=`echo '${code}' > test.cpp && g++ test.cpp -o test && ./test`;
        return ['bin/bash','-c',runCommand];
    }
}